import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { 
  IBoardsServiceCreate, 
  IBoardsServiceFindOne,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate, 
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
 checkList({ startPoint, endPoint, title }: IBoardsServiceNullCheckList): void {
  // 출발 및 도착 선택검증
   if(!startPoint || !endPoint) { 
    throw new UnprocessableEntityException('지역을 선택해주세요');
  }

  // 제목 검증
  if(!title.trim()) {
    throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
  }
 }

 // 좋와요 증가 및 감소
 async toggleLike(boardId: string, isLike: boolean): Promise<Board> {
  const board = await this.findOne({ boardId });
  if (isLike) {
    board.like += 1; // 좋아요 수를 1 증가시킴
  } else {
    if (board.like > 0) {
      board.like -= 1; // 좋아요 수를 1 감소시킴
    }
  }
  return this.boardsRepository.save(board);
 }

 //게시물 작성하기
  async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const {  title, startPoint, endPoint } = createBoardInput;

    this.checkList({ startPoint , endPoint, title });

    return this.boardsRepository.save({
      ...createBoardInput
   });
 }

 //게시물 업데이트하기
 async update({
  boardId,
  updateBoardInput,
 }: IBoardsServiceUpdate): Promise<Board> {
  const board = await this.findOne({ boardId });
  const { title, startPoint, endPoint } = updateBoardInput
  this.checkList({ startPoint , endPoint, title });

  return this.boardsRepository.save({
    ...board,
    ...updateBoardInput,
  });
 }
}