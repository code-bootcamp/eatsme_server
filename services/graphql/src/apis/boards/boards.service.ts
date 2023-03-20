import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { 
  IBoardServiceCreate, 
  IBoardServiceNullCheckEndPoint, 
  IBoardServiceNullCheckStartPoint, 
  IBoardServiceNullCheckTitle, 
  IBoardsServiceDelete, 
  IBoardsServiceFindOne, 
  IBoardsServiceUpdate} from "./interfaces/board-service.interface";


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

 //출발지 선택검증
 checkStartPoint({ startPoint }: IBoardServiceNullCheckStartPoint): string {
  if(/^[가-힣]*$/.test(startPoint)) { // 나중에 프론트데이터받으면 조건값 수정할예정
    throw new UnprocessableEntityException('출발지를 선택해주세요');
  } 
  return startPoint
 }

 //도착지 선택검증
 checkEndPoint({ endPoint }: IBoardServiceNullCheckEndPoint): string { 
  if(/^[가-힣]*$/.test(endPoint)) { // 나중에 프론트데이터받으면 조건값 수정할예정
    throw new UnprocessableEntityException('도착지를 선택해주세요');
  }
  return endPoint
 }

  //제목 입력검증
  checkTitle({ title }: IBoardServiceNullCheckTitle): string {
    if(/^\s*$/.test(title)) {
      throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
    }
    return title
 }

 //게시물 작성하기
  async create({
   createBoardInput
 }: IBoardServiceCreate): Promise<Board> {
    const {  title, startPoint, endPoint } = createBoardInput;
    this.checkStartPoint({ startPoint });
    this.checkEndPoint({ endPoint })
    this.checkTitle({ title });
    const result = await this.boardsRepository.save({
      ...createBoardInput
    // comments: {
    //   id: commentsId,
    // },
   })
   console.log(result);
   return result;
 }

 //게시물 정보 업데이트
 async update({
    boardId,
    updateBoardInput,
  }: IBoardsServiceUpdate): Promise<Board> {
    this.findOne({ boardId });
    const board = await this.findOne({ boardId });
    const {  title, startPoint, endPoint } = updateBoardInput
    this.checkStartPoint({ startPoint });
    this.checkEndPoint({ endPoint })
    this.checkTitle({ title });
    const result = this.boardsRepository.save({
      ...board,
      ...updateBoardInput,
    });
    return result;
  }

  //게시물 정보 삭제
  async delete({ boardId }: IBoardsServiceDelete): Promise<boolean> {
    const result = await this.boardsRepository.softDelete({
      
      id: boardId,
    });
    return result.affected ? true : false;
  }
}