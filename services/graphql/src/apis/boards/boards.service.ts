import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

import { FetchBoardReturn } from './dto/fetch-board.object';

import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceDelete,

  IBoardsServiceFindOne,
  // IBoardsServiceFetchBoard,
  // IBoardsServiceFetchBoardReturn,
  // IBoardsServiceFindArea,
  // IBoardsServiceFindOne,
  // IBoardsServiceFindSection,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate,
} from './interfaces/board-service.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    // @InjectRepository(Comment)
    // private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}



  async findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {

  //한개의 게시물 정보조회
  async fetchBoard({
    fetchBoardInput,
  }: IBoardsServiceFetchBoard): Promise<FetchBoardReturn> {
    const { boardId, restaurantIds } = fetchBoardInput;
    const board = await this.findOne({ boardId });
    const restaurantInfo = await axios.get(
      'http://road-service:7100/info/road/map',
      {
        data: restaurantIds,
      },
    );

    const personalBoard = { ...board, data: restaurantInfo.data };
    return personalBoard;
  }


    return await this.boardsRepository.findOne({ 
    where: { 
      id: boardId
    },
    relations: [ 
      'user',
      'comments'
    ] // 테이블간의 관계? 현재 board라는 부모안에 comments라는 자식의 관계를 의미
  })
  }


  //시,도별 게시물 정보조회
  async findArea({
    area,
  }: IBoardsServiceFindArea): Promise<FetchBoardReturn[]> {
    const BoardInfo = await this.boardsRepository.find({ where: { area } });
    const personalBoards = await Promise.all(
      BoardInfo.map(async (el) => {
        const restaurantInfo = await axios.get(
          'http://road-service:7100/info/road/map',
          {
            data: el.restaurantIds,
          },
        );
        return { ...el, data: restaurantInfo.data };
      }),
    );
    console.log(personalBoards, '$$$$$$');
    return personalBoards;
  }

  //행정구역별 게시물 조회
  async findByStartPoint({
    fetchBoardsBySectionInput,
  }: IBoardsServiceFindSection): Promise<FetchBoardReturn[]> {
    const BoardInfo = await this.boardsRepository.find({
      where: { ...fetchBoardsBySectionInput },
    });
    const personalBoards = await Promise.all(
      BoardInfo.map(async (el) => {
        const restaurantInfo = await axios.get(
          'http://road-service:7100/info/road/map',
          {
            data: el.restaurantIds,
          },
        );
        return { ...el, data: restaurantInfo.data };
      }),
    );
    return personalBoards;
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
    const restaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        ...createBoardInput,
      },
    );
    const restaurantIds = restaurantInfo.data.map((el) => el._id);

    const { title, startPoint, endPoint } = createBoardInput;
    await this.checkList({ title, startPoint, endPoint });
    return this.boardsRepository.save({
      ...createBoardInput,
      restaurantIds,
    });
  }

  //게시물 업데이트하기
  async update({ updateBoardInput }: IBoardsServiceUpdate): Promise<Board> {
    const { boardId, title, startPoint, endPoint } = updateBoardInput;
    const board = await this.findOne({ boardId });
    if (!board) {
      throw new NotFoundException('게시판 아이디가 일치하지않습니다'); //어떤 에러인지 찾아보고 적합한지 확인하기
    }
    await this.checkList({ title, startPoint, endPoint });

    return this.boardsRepository.save({
      ...board,
      ...updateBoardInput,
    });
  }

  //게시물 삭제하기
  async delete({ boardId }: IBoardsServiceDelete): Promise<string> {
    const board = await this.boardsRepository.delete(boardId);
    console.log(board);
    return board.affected ? '데이터삭제' : '데이터없음';
  }
}
