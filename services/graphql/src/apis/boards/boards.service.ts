import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { ImagesService } from '../images/images.service';
import { PersonalMapData } from '../personalMapData/entities/personalMapData.entity';
import { PersonalMapDataService } from '../personalMapData/personalMapdata.service';
import { ToggleLikeService } from '../toggleLike/toggleLike.service';
import { UserService } from '../users/users.service';
import { BoardReturn } from './dto/fetch-board.object';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceDelete,
  IBoardsServiceFetchBoard,
  IBoardsServiceFindByBoardId,
  IBoardsServiceFindByEvery,
  IBoardsServiceFindByUser,
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

    private readonly personalMapDataService: PersonalMapDataService,

    private readonly toggleLikeService: ToggleLikeService,

    private readonly userService: UserService,

    private readonly filesService: FilesService,

    private readonly imagesService: ImagesService,
  ) {}
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

  async findOneByBoardId({
    boardId,
  }: IBoardsServiceFindByBoardId): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { id: boardId }, //
      relations: ['comments.replies', 'comments', 'personalMapData', 'user'],
    });
    if (!board) throw new UnprocessableEntityException('등록후 조회해주세요');
    return board;
  }

  //한개의 게시물 정보조회
  async fetchBoard({
    boardId,
  }: IBoardsServiceFetchBoard): Promise<BoardReturn> {
    const board = await this.findOneByBoardId({ boardId });
    const restaurantIds = JSON.parse(JSON.stringify(board.personalMapData)).map(
      (el) => {
        return el.restaurantId;
      },
    );
    const restaurantInfo = await axios.get(
      `http://road-service:7100/info/road/map?data=${restaurantIds}`,
    );
    board.personalMapData = restaurantInfo.data.map((el, i) => {
      return { ...el, ...board.personalMapData[i] };
    });
    return {
      ...JSON.parse(JSON.stringify(board)),
      createdAt: board.createdAt,
    };
  }
  //내가 작성한 게시물 정보조회

  async findByUser({ context }: IBoardsServiceFindByUser): Promise<Board[]> {
    const boards = await this.boardsRepository.find({
      where: {
        user: {
          id: context.req.user.id,
        },
      },
      relations: ['personalMapData'],
    });
    return boards;
  }

  async fetchMyBoard({
    context,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const boards = await this.findByUser({ context });
    if (boards.length) {
      const fetchMyBoards = await Promise.all(
        boards.map(async (el) => {
          return await this.fetchBoard({ boardId: el.id });
        }),
      );
      return fetchMyBoards;
    } else {
      return '작성한 게시물이 없습니다.';
    }
  }

  async fetchMyLikeBoard({
    context,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const ToggleLikeIds = await this.toggleLikeService.findToggleLikeIds({
      context,
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

  async findByEvery({
    fetchBoardsByEveryInput,
  }: IBoardsServiceFindByEvery): Promise<Board[]> {
    const boards = await this.boardsRepository.find({
      where: { ...fetchBoardsByEveryInput },
      relations: ['comments.replies', 'comments', 'personalMapData', 'user'],
    });
    return boards;
  }
  //시,행정구역별 게시물 조회
  async fetchByEvery({
    fetchBoardsByEveryInput,
  }: IBoardsServiceFindSection): Promise<BoardReturn[]> {
    const boards = await this.findByEvery({ fetchBoardsByEveryInput });

    const personalBoards = await Promise.all(
      boards.map(async (el) => {
        return await this.fetchBoard({ boardId: el.id });
      }),
    );

    return personalBoards;
  }

  //게시물 작성하기
  async create({
    context,
    createBoardInput,
  }: IBoardsServiceCreate): Promise<BoardReturn> {
    const { info, ...boardInfo } = createBoardInput;
    const { title, startPoint, endPoint } = boardInfo;
    await this.checkList({ title, startPoint, endPoint });

    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });

    const board = await this.boardsRepository.save({
      ...boardInfo,
      user,
    });

    const restaurantInfo = await axios.post(
      `http://road-service:7100/info/road/map`,
      {
        info,
      },
    );

    const restaurantMainInfos = await Promise.all(
      restaurantInfo.data.map(async (el, i) => {
        const sum = { ...el, ...info[i] };

        const { phoneNumber, openingDays, __v, ...personalMapInfo } = sum;

        const isSave = {
          board,
          restaurantId: sum._id,
          ...personalMapInfo,
        };

        const personalMapData =
          await this.personalMapDataService.savePersonalMapData({
            isSave,
          });

        return personalMapData;
      }),
    );

    return { ...board, personalMapData: restaurantMainInfos };
  }

  //게시물 업데이트하기
  async update({
    updateBoardInput,
    context,
  }: IBoardsServiceUpdate): Promise<BoardReturn> {
    const { info, boardId, ...rest } = updateBoardInput;
    const board = await this.findOneByBoardId({ boardId });
    if (context.req.user.id !== board.user.id) {
      throw new UnprocessableEntityException(
        '등록되지 않은 게시물입니다. 등록후 업데이트 해주세요',
      );
    }
    const personalMapDataIds = [];
    //url이 없어 임시로 주석 처리 했습니다.
    JSON.parse(JSON.stringify(board.personalMapData)).forEach(async (el) => {
      // await this.imagesService.storageDelete({ ...el.imgUrl });
      personalMapDataIds.push(el.id);
    });

    return this.personalMapDataService
      .deletePersonalMapDatas({ personalMapDataIds })
      .then(async (res) => {
        const json = JSON.stringify({ info });
        const restaurantInfo = await axios.post(
          'http://road-service:7100/info/road/map',
          json,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const restaurantMainInfos = await Promise.all(
          restaurantInfo.data.map(async (el, i) => {
            const sum = { ...el, ...info[i] };

            const { phoneNumber, openingDays, __v, ...personalMapInfo } = sum;

            const isSave = {
              board,
              restaurantId: sum._id,
              ...personalMapInfo,
            };

            const personalMapData =
              await this.personalMapDataService.savePersonalMapData({
                isSave,
              });

            return personalMapData;
          }),
        );

        return { ...board, personalMapData: restaurantMainInfos };
      })
      .catch((err) => {
        throw new UnprocessableEntityException(err);
      });
  }

  //게시물 삭제하기
  async delete({ boardId, context }: IBoardsServiceDelete): Promise<string> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    const isDelete = JSON.parse(JSON.stringify(user.boards)).filter((el) => {
      return el.id === boardId;
    });
    if (!isDelete.length) {
      const board = await this.boardsRepository.delete(boardId);
      return board.affected
        ? '게시물이 정상적으로 삭제되었습니다.'
        : '이미 지워진 게시물입니다.';
    } else {
      return '이미 지워진 게시물입니다.';
    }
  }
}
