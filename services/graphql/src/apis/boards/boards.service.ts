import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceDelete,
  IBoardsServiceFindOne,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate,
} from './interfaces/board-service.interface';

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
    return this.boardsRepository.find();
  }

  //지역 선택검증
  async checkList({
    title,
    startPoint,
    endPoint,
  }: IBoardsServiceNullCheckList): Promise<void> {
    // 출발,도착 선택검증 및 제목작성확인
    if (!startPoint || !endPoint) {
      throw new UnprocessableEntityException('지역을 선택해주세요');
    } else if (!title.trim()) {
      throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
    }
  }

  //게시물 작성하기
  async create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const { title, startPoint, endPoint } = createBoardInput;
    await this.checkList({ title, startPoint, endPoint });

    return this.boardsRepository.save({
      ...createBoardInput,
    });
  }

  //게시물 업데이트하기
  async update({
    boardId,
    updateBoardInput,
  }: IBoardsServiceUpdate): Promise<Board> {
    const board = await this.findOne({ boardId });
    const { title, startPoint, endPoint } = updateBoardInput;
    await this.checkList({ title, startPoint, endPoint });

    return this.boardsRepository.save({
      ...board,
      ...updateBoardInput,
    });
  }

  //게시물 삭제하기
  async delete({ boardId }: IBoardsServiceDelete): Promise<boolean> {
    const board = await this.boardsRepository.delete(boardId);
    return board.affected ? true : false;
  }
}
