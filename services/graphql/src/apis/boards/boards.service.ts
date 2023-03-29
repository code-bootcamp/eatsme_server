import {
  ConsoleLogger,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Comment } from '../Comments/entities/comment.entity';
import { PersonalMapData } from '../personalData/entities/personalData.entity';
import { ToggleLike } from '../toggleLike/entities/toggleLike.entity';
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
  IBoardsServiceMyFetchBoard,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate,
} from './interfaces/board-service.interface';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(PersonalMapData)
    private readonly personalDataRepository: Repository<PersonalMapData>,

    @InjectRepository(ToggleLike)
    private readonly toggleLikeRepository: Repository<ToggleLike>,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
    return this.boardsRepository.findOne({
      where: { id: boardId }, //
      relations: ['comments', 'comments.replies', 'personalMapData', 'user'],
    });
  }

  //내가 작성한 게시물 정보조회
  async fetchMyBoard({
    userId,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const myBoards = await this.boardsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (myBoards.length) {
      const fetchMyBoards = await Promise.all(
        myBoards.map(async (el) => {
          return await this.fetchBoard({ boardId: el.id });
        }),
      );
      return fetchMyBoards;
    } else {
      return '작성한 게시물이 없습니다.';
    }
  }

  async fetchMyLikeBoard({
    userId,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const ToggleLikeIds = await this.toggleLikeRepository.find({
      where: {
        userId,
      },
    });
    if (ToggleLikeIds.length) {
      const fetchMyLikeBoard = await Promise.all(
        ToggleLikeIds.map(async (el) => {
          return await this.fetchBoard({ boardId: el.boardId });
        }),
      );
      return fetchMyLikeBoard;
    } else {
      return '찜한 게시물이 없습니다.';
    }
  }
  //한개의 게시물 정보조회
  async fetchBoard({
    boardId,
  }: IBoardsServiceFetchBoard): Promise<BoardReturn> {
    const board = await this.findOne({ boardId });
    const restaurantIds = JSON.parse(JSON.stringify(board.personalMapData)).map(
      (el) => {
        return el.restaurantId;
      },
    );
    const restaurantInfo = await axios.get(
      'http://road-service:7100/info/road/map',
      {
        data: restaurantIds,
      },
    );
    board.personalMapData = restaurantInfo.data.map((el, i) => {
      const sum = { ...el, ...board.personalMapData[i] };
      const {
        _id: restaurantId,
        restaurantName,
        address,
        location,
        rating,
        recommend,
        imgUrl,
      } = sum;

      return {
        restaurantId,
        restaurantName,
        address,
        location,
        rating,
        recommend,
        imgUrl,
      };
    });

    return JSON.parse(JSON.stringify(board));
  }
  //시,도별 게시물 정보조회
  async findArea({ area }: IBoardsServiceFindArea): Promise<BoardReturn[]> {
    const BoardInfo = await this.boardsRepository.find({
      where: { area },
      relations: ['personalMapData'],
    });

    const personalBoards = await Promise.all(
      BoardInfo.map(async (el) => {
        return await this.fetchBoard({ boardId: el.id });
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
        return await this.fetchBoard({ boardId: el.id });
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
    userId,
  }: IBoardsServiceCreate): Promise<BoardReturn> {
    //제목,행정구역이 유효한지 검증

    const { info, ...boardInfo } = createBoardInput;
    const { title, startPoint, endPoint } = boardInfo;
    await this.checkList({ title, startPoint, endPoint });

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    //생성한 식당 정보와 이미지url그리고 추천음식정보를 함께 담아준다.
    const board = await this.boardsRepository.save({
      ...boardInfo,
      user,
    });

    const restaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        info,
      },
    );
    const restaurantMainInfos = await Promise.all(
      restaurantInfo.data.map(async (el, i) => {
        const sum = { ...el, ...info[i] };
        const {
          _id: restaurantId,
          restaurantName,
          address,
          location,
          rating,
          recommend,
          imgUrl,
        } = sum;
        const personalMapData = await this.personalDataRepository.save({
          restaurantId,
          restaurantName,
          address,
          location,
          rating,
          recommend,
          imgUrl,
          board,
        });
        const { board: newBoard, ...restaurantInfo } = personalMapData;
        return restaurantInfo;
      }),
    );
    return { ...board, personalMapData: restaurantMainInfos };
  }
  //게시물 업데이트하기
  async update({
    updateBoardInput,
  }: IBoardsServiceUpdate): Promise<BoardReturn> {
    const { info, ...boardInfo } = updateBoardInput;
    const { boardId } = boardInfo;
    const board = await this.findOne({ boardId });
    if (!board) {
      throw new NotFoundException('게시판 아이디가 일치하지않습니다'); //어떤 에러인지 찾아보고 적합한지 확인하기
    }
    const restaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        info,
      },
    );
    const restaurantMainInfos = await Promise.all(
      restaurantInfo.data.map(async (el, i) => {
        const sum = { ...el, ...info[i] };
        const {
          _id: restaurantId,
          restaurantName,
          address,
          location,
          rating,
          recommend,
          imgUrl,
        } = sum;
        //찾은후 저장하면 된다. boardId하고 restaurantId로 찾으면 되지 않을까?
        const oldPersonalMapData = await this.personalDataRepository.findOne({
          where: {
            restaurantId,
            recommend,
            imgUrl,
          },
        });

        const newPersonalMapData = await this.personalDataRepository.save({
          ...oldPersonalMapData,
          restaurantId,
          recommend,
          imgUrl,
          board,
        });
        const { board: newBoard, ...restaurantInfo } = newPersonalMapData;
        return restaurantInfo;
      }),
    );
    //식당 정보를 한번더 조회해줘야 한다.
    console.log({ ...board, personalMapData: restaurantMainInfos });
    return { ...board, personalMapData: restaurantMainInfos };
  }
  //게시물 삭제하기
  async delete({ boardId }: IBoardsServiceDelete): Promise<string> {
    const board = await this.boardsRepository.delete(boardId);
    return board.affected ? '데이터삭제' : '데이터없음';
  }
}
