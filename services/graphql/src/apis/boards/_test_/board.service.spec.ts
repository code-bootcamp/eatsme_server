
import { ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { Test,} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { title } from 'process';
import { async } from 'rxjs';
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
  it('제목을 검증에 맞게 한글만 입력했을때', async () => {
    const title = '중화식당'
    const startPoint = '강북구'
    const endPoint = '서초구'

   const result = await boardsService.checkList({ title, startPoint, endPoint });
   expect(result).toEqual('강북구');
  });
 });
})

