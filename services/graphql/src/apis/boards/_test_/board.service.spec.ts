
import { ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { Test,} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { title } from 'process';
import { async } from 'rxjs';
import { BoardsService } from '../boards.service';
import { Board } from '../entities/board.entity';

class MockBoardsService {
  mydb = [
    { title: '', boardImg: 'zxcv...img', startPoint: '강북구', endPoint: '영등포구', customName: '짜장면 맛집',like: 20, },
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

 describe('create', () => {
  it('제목을 작성했는지 검증 성공1', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('제목을 작성했는지 검증 성공2', async () => {
   const myData = {
    createBoardInput: {
     title: '!',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('제목을 작성했는지 검증 성공2', async () => {
   const myData = {
    createBoardInput: {
     title: 'a',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });
 
 describe('create', () => {
  it('제목을 작성했는지 검증 실패', async () => {
   const myData = {
    createBoardInput: {
     title: '',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('제목을 작성했는지 검증 실패', async () => {
   const myData = {
    createBoardInput: {
     title: ' ',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증 성공', async () => {
   const myData = {
    createBoardInput: {
     title: '전주비빔밥',
     boardImg: 'zxcv...img', 
     startPoint: '도봉구', 
     endPoint: '강남구', 
     customName: '비빔밥 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });
 
 describe('create', () => {
  it('출발지를 작성했는지 검증 실패1', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증 실패2', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '!', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증 실패3', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: 'a', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증 실패4', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '1', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증 성공', async () => {
   const myData = {
    createBoardInput: {
     title: '노랑통닭',
     boardImg: 'zxcv...img', 
     startPoint: '강서구', 
     endPoint: '서초구', 
     customName: '치킨 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });
 
 describe('create', () => {
  it('도착지를 작성했는지 검증 실패1', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증 실패2', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '!', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증 실패3', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: 'a', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증 실패4', async () => {
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '1`', 
     customName: '짜장면 맛집',
     like: 20,
    }
   };
   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect(error.message).toEqual('에러 발생');
   }
  });
 });
})

