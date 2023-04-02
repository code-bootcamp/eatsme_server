import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { In, Repository } from 'typeorm';
import { Comment } from '../Comments/entities/comment.entity';
import { FilesService } from '../files/files.service';
import { PersonalMapData } from '../personalMapData/entities/personalMapData.entity';
import { ToggleLike } from '../toggleLike/entities/toggleLike.entity';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { BoardReturn } from './dto/fetch-board.object';
import { Board } from './entities/board.entity';
import {
  IBoardsServiceCreate,
  IBoardsServiceDelete,
  IBoardsServiceFetchBoard,
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
    private readonly personalMapDataRepository: Repository<PersonalMapData>,

    @InjectRepository(ToggleLike)
    private readonly toggleLikeRepository: Repository<ToggleLike>,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly userService: UserService,

    private readonly filesService: FilesService,
  ) {}

  async findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { id: boardId }, //
      relations: ['comments.replies', 'comments', 'personalMapData', 'user'],
    });
    if (!board) throw new UnprocessableEntityException('등록후 조회해주세요');
    return board;
  }

  //내가 작성한 게시물 정보조회
  async fetchMyBoard({
    context,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const myBoards = await this.boardsRepository.find({
      where: {
        user: {
          id: context.req.user.id,
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
    context,
  }: IBoardsServiceMyFetchBoard): Promise<BoardReturn[] | string> {
    const ToggleLikeIds = await this.toggleLikeRepository.find({
      where: {
        id: context.req.user.id,
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
    if (restaurantIds.length) {
      const restaurantInfo = await axios.get(
        `http://road-service:7100/info/road/map?data=${restaurantIds}`,
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
    }

    return {
      ...JSON.parse(JSON.stringify(board)),
      createdAt: board.createdAt,
    };
  }

  //시,행정구역별 게시물 조회
  async findByEvery({
    fetchBoardsByEveryInput,
  }: IBoardsServiceFindSection): Promise<BoardReturn[]> {
    const BoardInfo = await this.boardsRepository.find({
      where: { ...fetchBoardsByEveryInput },
      relations: ['user', 'comments', 'comments.replies', 'personalMapData'],
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
    id,
    createBoardInput,
  }: IBoardsServiceCreate): Promise<BoardReturn> {
    const { info, ...boardInfo } = createBoardInput;
    const { title, startPoint, endPoint } = boardInfo;
    await this.checkList({ title, startPoint, endPoint });
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    //생성한 식당 정보와 이미지url그리고 추천음식정보를 함께 담아준다.
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
    //트랜잭션을 꼭해줘야 하는구나 트랜잭션이 없기에 발생하는 에러 인듯 하다.
    console.log(restaurantInfo);
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
          area,
          section,
        } = sum;

        const personalMapData = await this.personalMapDataRepository.save({
          area,
          board,
          section,
          restaurantId,
          restaurantName,
          recommend,
          imgUrl,
        });
        const { board: newBoard, ...restaurantInfo } = personalMapData;
        return restaurantInfo;
      }),
    );

    return { ...board, personalMapData: restaurantMainInfos };
  }
  //게시물 업데이트하기
  async update({ updateBoardInput }: IBoardsServiceUpdate): Promise<void> {
    const { info, ...boardInfo } = updateBoardInput;
    const { boardId } = boardInfo;
    const board = await this.findOne({ boardId });
    if (!board) {
      throw new NotFoundException('등록되지 않은 게시판입니다.');
    }

    //입력값에 대한 정제가 필요하다.
    const newRestaurantInfo = await axios.post(
      'http://road-service:7100/info/road/map',
      {
        info,
      },
    );
    const newPersonalMapData = info.map((el, i) => {
      console.log(el);

      const { location, restaurantName, ...rest } = el;
      return { ...rest, restaurantId: newRestaurantInfo.data[i]._id };
    });

    const oldPersonalMapDatas = JSON.parse(
      JSON.stringify(board.personalMapData),
    );
    console.log(newPersonalMapData);
    console.log('#########');
    console.log(oldPersonalMapDatas);
    //id,area,section,restaurantId,recommend,imgUrl
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
