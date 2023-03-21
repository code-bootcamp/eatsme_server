import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { 
  IBoardServiceCreate, 
  IBoardServiceNullCheckList, 
  IBoardServiceNullCheckTitle, 
  IBoardsServiceFindOne, 
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
 checkList({ startPoint, endPoint, title }: IBoardServiceNullCheckList): Promise<Board> {
  const regions = ['도봉구', '노원구', '강북구', '은평구', '종로구', '성북구', '중랑구', '광진구', '동대문구',
   '성동구', '중구', '종로구', '용산구', '서대문구', '마포구', '강서구', '양천구', '구로구', '영등포구',
   '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'];
  // 출발지 선택검증
   if(!regions.includes(startPoint)) { 
    throw new UnprocessableEntityException('지역을 선택해주세요');
  }

  // 도착지 선택검증
  if(!regions.includes(endPoint)) { 
    throw new UnprocessableEntityException('지역을 선택해주세요');
  }
  
  // 제목 검증
  if(/^\s*$/.test(title)) {
    throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
  }
  return
 }

 //게시물 작성하기
  async create({ createBoardInput }: IBoardServiceCreate): Promise<Board> {
    const {  title, startPoint, endPoint } = createBoardInput;

    await this.checkList({ startPoint , endPoint, title });

    return this.boardsRepository.save({
      ...createBoardInput
   });
 }
}