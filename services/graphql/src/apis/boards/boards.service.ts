import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Comment } from '../Comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { BoardReturn } from './dto/fetch-board.object';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceDelete,
  IBoardsServiceFetchBoard,
  IBoardsServiceFindArea,
  IBoardsServiceFindOne,
  IBoardsServiceFindSection,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate,
} from './interfaces/board-service.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,


    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
    return this.boardsRepository.findOne({ where: { id: boardId } });
  }

  //한개의 게시물 정보조회
  async fetchBoard({
    fetchBoardInput,
  }: IBoardsServiceFetchBoard): Promise<BoardReturn> {
    const { boardId, restaurantIds } = fetchBoardInput;
    const board = await this.findOne({ boardId });
    const restaurantInfo = await axios.get(
      'http://road-service:7100/info/road/map',
      {
        data: restaurantIds,
      },
    );

    const personalBoard = { ...board, info: restaurantInfo.data };
    return personalBoard;
  }
  //시,도별 게시물 정보조회
  async findArea({ area }: IBoardsServiceFindArea): Promise<BoardReturn[]> {
    const BoardInfo = await this.boardsRepository.find({ where: { area } });
    const personalBoards = await Promise.all(
      BoardInfo.map(async (el) => {
        const restaurantInfo = await axios.get(
          'http://road-service:7100/info/road/map',
          {
            data: el.restaurantIds,
          },
        );
        return { ...el, info: restaurantInfo.data };
      }),
    );
    return personalBoards;
  }
  //행정구역별 게시물 조회
  async findByStartPoint({
    fetchBoardsBySectionInput,
  }: IBoardsServiceFindSection): Promise<BoardReturn[]> {
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
        return { ...el, info: restaurantInfo.data };
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
  async create({
    createBoardInput,
  }: IBoardsServiceCreate): Promise<BoardReturn> {
    const restaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        ...createBoardInput,
      },
    );
    const restaurantIds = restaurantInfo.data.map((el) => el._id);
    const restaurantMainInfos = restaurantInfo.data.map((el) => {
      const {
        area,
        section,
        userRatingsTotal,
        phoneNumber,
        openingDays,
        __v,
        ...sendInfo
      } = el;
      return sendInfo;
    });
    const { title, startPoint, endPoint } = createBoardInput;
    await this.checkList({ title, startPoint, endPoint });
    const boardInfo = await this.boardsRepository.save({
      ...createBoardInput,
      restaurantIds,
    });
    const personalBoards = { ...boardInfo, info: restaurantMainInfos };

    return personalBoards;
  }
  //게시물 업데이트하기
  async update({
    updateBoardInput,
  }: IBoardsServiceUpdate): Promise<BoardReturn> {
    const { boardId, title, startPoint, endPoint } = updateBoardInput;
    const board = await this.findOne({ boardId });
    if (!board) {
      throw new NotFoundException('게시판 아이디가 일치하지않습니다'); //어떤 에러인지 찾아보고 적합한지 확인하기
    }
    const restaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        ...updateBoardInput,
      },
    );
    const restaurantIds = restaurantInfo.data.map((el) => el._id);
    const restaurantMainInfos = restaurantInfo.data.map((el) => {
      const {
        area,
        section,
        userRatingsTotal,
        phoneNumber,
        openingDays,
        __v,
        ...sendInfo
      } = el;
      return sendInfo;
    });
    await this.checkList({ title, startPoint, endPoint });
    const boardInfo = await this.boardsRepository.save({
      ...updateBoardInput,
      restaurantIds,
    });
    const personalBoards = { ...boardInfo, info: restaurantMainInfos };

    return personalBoards;
  }
  //게시물 삭제하기
  async delete({ boardId }: IBoardsServiceDelete): Promise<string> {
    const board = await this.boardsRepository.delete(boardId);
    console.log(board);
    return board.affected ? '데이터삭제' : '데이터없음';
  }


  // async toggleLike(boardId: string, isLike: boolean): Promise<Board> {
  //   const board = await this.findOne({ boardId });
  //   if (isLike) {
  //     board.like += 1; // 좋아요 수를 1 증가시킴
  //   } else {
  //     if (board.like > 0) {
  //       board.like -= 1; // 좋아요 수를 1 감소시킴
  //     }
  //   }
  //   return this.boardsRepository.save(board);
  // }
}

