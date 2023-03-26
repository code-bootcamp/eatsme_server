import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Comment } from "../Comments/entities/comment.entity";
import { User } from "../users/entities/user.entity";
import { Board } from "./entities/board.entity";
import { 
  IBoardsServiceCreate, 
  IBoardsServiceDelete, 
  IBoardsServiceFindOne,
  IBoardsServiceNullCheckList,
  IBoardsServiceUpdate, 
} from "./interfaces/board-service.interface";


@Injectable()
export class BoardsService {
 constructor(
  @InjectRepository(Board)
  private readonly boardsRepository: Repository<Board>,

  @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
 ) {}
 
 //한개의 게시물 정보조회
  async findOne({ boardId }: IBoardsServiceFindOne): Promise<Board> {
    
    const board = await this.boardsRepository.findOne({ 
    where: { 
      id: boardId
    },
    relations: ['comments'] // 테이블간의 관계? 현재 board라는 부모안에 comments라는 자식의 관계를 의미
  })
  console.log(board)
  return board
}

 //전체 게시물 정보조회
 async findAll(): Promise<Board[]> {
  return this.boardsRepository.find({
    relations: ['comments', 'users']
  })
 }

 //지역 선택검증
 async checkList({ course, startPoint, endPoint }: IBoardsServiceNullCheckList): Promise<void> {
  // 출발,도착 선택검증 및 제목작성확인
  if(!startPoint || !endPoint) { 
    throw new UnprocessableEntityException('지역을 선택해주세요');
  } else if (!course.trim()){
    throw new UnprocessableEntityException('제목을 제대로 입력해주세요');
  }
 }

 //게시물 작성하기
  async create({ userId, createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const { course, startPoint, endPoint } = createBoardInput;
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    console.log(user)
    await this.checkList({ course, startPoint, endPoint })
    // const result = await axios.get('http://road-service:7100/info/road/map', {
    //   data: {
    //     createBoardInput,
    //     info: createBoardMapInput
    //   },
    // });
    // console.log(result)
    return this.boardsRepository.save({
      ...createBoardInput,
      user: {
        id: userId
      }
   });
 }

 //게시물 업데이트하기
 async update({ 
  updateBoardInput,
  }: IBoardsServiceUpdate): Promise<Board> {
    const { boardId , course, startPoint, endPoint } = updateBoardInput
    const board = await this.findOne({ boardId });
    console.log(board)
    if(!board) {
      throw new NotFoundException('게시판 아이디가 일치하지않습니다') //어떤 에러인지 찾아보고 적합한지 확인하기
    }
    await this.checkList({ course, startPoint, endPoint  });

    return this.boardsRepository.save({
      ...board,
      ...updateBoardInput,
    });
  }

  //게시물 삭제하기
  async delete({ boardId }: IBoardsServiceDelete): Promise<string> {
    const board = await this.boardsRepository.delete(boardId);
    console.log(board)
    return board.affected ? '데이터삭제' : '데이터없음';
  }
}