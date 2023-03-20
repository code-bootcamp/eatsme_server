import { Test,} from '@nestjs/testing';
import { BoardsService } from '../boards.service';

class BoardsRepository {
  now = new Date();
  mydb = [
    { title: '중화식당', boardImg: 'zxcv...img', startPoint: '강북구', endPoint: '영등포구', customName: '짜장면 맛집',like: 20, createdAt: this.now, },
    { title: '전주비빔밥', boardImg: 'asdf...img', startPoint: '도봉구', endPoint: '강북구', customName: '비빔밥 맛집',like: 15, createdAt: this.now, },
  ];

  findOne({ where }) {
    const boards = this.mydb.filter((el) => el.title === where.title);
    if (boards.length) return boards[0];
    return null;
  }

  save({ title, boardImg, startPoint, endPoint, customName, like, createdAt }) {
    this.mydb.push({ title, boardImg, startPoint, endPoint, customName, like, createdAt });
    return { title, boardImg, startPoint, endPoint, customName, like, createdAt };
  }
}

describe('BoardsService', () => {
 let boardsService: BoardsService;
 let boardsRepository: BoardsRepository;

 beforeEach(async () => {
  const boardsModule = await Test.createTestingModule({
   providers: [
    BoardsService,
    BoardsRepository
   ],
  }).compile();

  boardsService = boardsModule.get<BoardsService>(BoardsService);
  boardsRepository = boardsModule.get<BoardsRepository>(BoardsRepository);
 });
  
 describe('create', () => {
  it('제목을 작성했는지 검증 성공', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '중화식당',
        boardImg: 'zxcv...img', 
        startPoint: '강북구', 
        endPoint: '영등포구', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
   }
  });
 });

 describe('create', () => {
  it('제목을 작성했는지 검증 실패', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '',
        boardImg: 'zxcv...img', 
        startPoint: '강북구', 
        endPoint: '영등포구', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
    expect(error.message).toEqual('제목을 작성을 해주세요');
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증성공', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '중화식당',
        boardImg: 'zxcv...img', 
        startPoint: '강북구', 
        endPoint: '영등포구', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
   }
  });
 });

 describe('create', () => {
  it('출발지를 작성했는지 검증실패', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '',
        boardImg: 'zxcv...img', 
        startPoint: '', 
        endPoint: '영등포구', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
    expect(error.message).toEqual('출발지를 작성을 해주세요');
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증성공', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '중화식당',
        boardImg: 'zxcv...img', 
        startPoint: '강북구', 
        endPoint: '영등포구', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
   }
  });
 });

 describe('create', () => {
  it('도착지를 작성했는지 검증실패', async () => {
   const now = new Date();
   const myData = {
    createBoardInput: {
     title: '중화식당',
     boardImg: 'zxcv...img', 
     startPoint: '강북구', 
     endPoint: '영등포구', 
     customName: '짜장면 맛집',
     like: 20,
     createdAt: now,
   }
   };

   try {
    await boardsService.create({ ...myData });
   } catch (error) {
    expect (error).toStrictEqual({
      createBoardInput: {
        title: '',
        boardImg: 'zxcv...img', 
        startPoint: '강북구', 
        endPoint: '', 
        customName: '짜장면 맛집',
        like: 20,
        createdAt: now,
      }}
    );
    expect(error.message).toEqual('도착지를 작성을 해주세요');
   }
  });
 });
})
