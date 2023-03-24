import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { ICommentServiceNullList, ICommentsServiceCreate } from "./interfaces/comment-service.interface";

@Injectable()
export class CommentsService {
 constructor(
  @InjectRepository(Comment)
  private readonly commentsRepository: Repository<Comment>
 ) {}

 findAll(): Promise<Comment[]> {
  return this.commentsRepository.find()
 }

 async nullCheck({ comment }: ICommentServiceNullList): Promise<void> {
  // 댓글을 입력했는지 확인
  if(!comment) {
   throw new UnprocessableEntityException('댓글을 입력해주세요');
  } else if (comment.length > 100) {
   throw new BadRequestException('입력 할 수 있는단어를 초과했습니다')
  }
 }

 async create({ createCommentInput }: ICommentsServiceCreate): Promise<Comment> {
  const { comment } = createCommentInput;
  await this.nullCheck({ comment })
  return this.commentsRepository.save({ ...createCommentInput })
 }
} 