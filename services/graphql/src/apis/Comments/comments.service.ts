import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "../boards/entities/board.entity";
import { Comment } from "./entities/comment.entity";
import { 
  ICommentServiceNullList, 
  ICommentsServiceCreate, 
  ICommentsServiceUpdate, 
  ICommentsServiceFindOne 
} from "./interfaces/comment-service.interface";

@Injectable()
export class CommentsService {
 constructor(
  @InjectRepository(Comment)
  private readonly commentsRepository: Repository<Comment>,

  @InjectRepository(Board)
  private readonly boardsRepository: Repository<Board>,
 ) {}

 async findOne({ commentId }: ICommentsServiceFindOne): Promise<Comment> {
  const board = await this.commentsRepository.findOne({ 
  where: { 
    id: commentId
  },
  relations: ['board']
  })
  console.log(board)
  return board
}

  findAll(boardId: string): Promise<Comment[]> {
  return this.commentsRepository.find({
    where: {
      board: {
        id: boardId
      }
    },
    relations: [
      'board',
    ]
  })
 }

 async nullCheck({ comment }: ICommentServiceNullList): Promise<void> {
  // 댓글을 입력했는지 확인
  if(!comment.trim()) {
   throw new UnprocessableEntityException('댓글을 입력해주세요');
  } else if (comment.length > 100) {
   throw new BadRequestException('입력 할 수 있는단어를 초과했습니다')
  }
 }

 async create({ boardId, createCommentInput }: ICommentsServiceCreate): Promise<Comment> {
  const { comment } = createCommentInput;
  const board = await this.boardsRepository.findOne({ 
    where: { 
      id: boardId //id필드가 boardId 변수와 일치하는 board객체를 찾을때 사용하는 필터
    }
  })
  console.log(comment, board)
  await this.nullCheck({ comment })
  return this.commentsRepository.save({ 
   ...createCommentInput,
   board: {
    id: boardId // save 메서드를 이용해서 boardId와 일치하는 게시물 객체를 찾아서 해당 댓글 객체를 속하게 하는 코드
   }
  });
 }

 async update({
  updateCommentInput,
 }: ICommentsServiceUpdate): Promise<Comment> {  
  const { comment, commentId } = updateCommentInput;
  const comments = await this.findOne({ commentId });
  if(!comments) {
    throw new NotFoundException('댓글 아이디가 일치하지않습니다')
  }

  await this.nullCheck({ comment })

  return this.commentsRepository.save({
    ...updateCommentInput
  })
 }
} 