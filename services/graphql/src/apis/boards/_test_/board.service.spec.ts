
import { UnprocessableEntityException } from '@nestjs/common';
import { Test,} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BoardsService } from '../boards.service';
import { Board } from '../entities/board.entity';

class MockBoardsService {
  mydb = [
    { title: '중화식당', boardImg: 'zxcv...img', startPoint: '강북구', endPoint: '영등포구', customName: '짜장면 맛집',like: 20, },
  ];

  // findOne({ where }) {
  //   const boards = this.mydb.filter((el) => el.title === where.title);
  //   if (boards.length) return boards[0];
  //   return null;
  // }

  save({ title, boardImg, startPoint, endPoint, customName, like }) {
    this.mydb.push({ title, boardImg, startPoint, endPoint, customName, like });
    return { title, boardImg, startPoint, endPoint, customName, like };
  }
}

describe('BoardsService', () => {
 let boardsService: BoardsService;

 beforeEach(async () => {
  const boardsModule = await Test.createTestingModule({
   providers: [
    BoardsService,
    {
      provide: getRepositoryToken(Board),
      useClass: MockBoardsService,
    },
   ],
  }).compile();

  boardsService = boardsModule.get<BoardsService>(BoardsService);
 });

 describe('checkList', () => {
  it('제목과 출발지, 도착지를 모두 입력했을 때', () => {
    const title = '중화식당'
    const startPoint = '강북구'
    const endPoint = '서초구'

    expect(() => boardsService.checkList({ title, startPoint, endPoint })).not.toThrow();
  });

  it('제목에 빈값일때', () => {
    const title = ''
    const startPoint = '강북구'
    const endPoint = '서초구'

    expect(() => boardsService.checkList({ title, startPoint, endPoint })).toThrow(UnprocessableEntityException);
  });

  it('출발지가 선택되지 않았을 때', async () => {
    const title = '중화식당'
    const startPoint = ''
    const endPoint = '서초구'

    expect(async () => {
      await boardsService.checkList({ title, startPoint, endPoint });
    }).rejects.toThrow(UnprocessableEntityException);
  });

  it('도착지가 선택되지 않았을 때', async () => {
    const title = '중화식당'
    const startPoint = '강북구'
    const endPoint = ''

    expect(async () => {
      await boardsService.checkList({ title, startPoint, endPoint });
    }).rejects.toThrow(UnprocessableEntityException);
  });
 });
})

