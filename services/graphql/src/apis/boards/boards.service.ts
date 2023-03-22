import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { 
  IBoardsServiceCreate, 
  IBoardsServiceFindOne,
  IBoardsServiceNullCheckList, 
} from "./interfaces/board-service.interface";


@Injectable()
export class BoardsService {
 constructor(
  @InjectRepository(Board)
  private readonly boardsRepository: Repository<Board>,
 ) {}
 
 //한개의 게시물 정보조회
 findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
  return this.boardsRepository.findOne({ where: { id: boardId } });
}


 //전체 게시물 정보조회
 findAll(): Promise<Board[]> {
  return this.boardsRepository.find()
 }

 //지역 선택검증
 checkList({ startPoint, endPoint, title }: IBoardsServiceNullCheckList): Promise<string> | void {
  // 출발 및 도착 선택검증
   if(!startPoint || !endPoint) { 
    throw new UnprocessableEntityException('지역을 선택해주세요');
  }

  // 제목 검증
  if(!title.trim()) {
    throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
  }
 }

 //게시물 작성하기
  async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const {  title, startPoint, endPoint } = createBoardInput;

    await this.checkList({ startPoint , endPoint, title });
    console.log(title)
    return this.boardsRepository.save({
      ...createBoardInput
   });
 }
}