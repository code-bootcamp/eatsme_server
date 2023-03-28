import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { Reply } from '../replies/entities/reply.entity';
import { Comment } from './entities/comment.entity';
import {
  ICommentServiceNullList,
  ICommentsServiceCreate,
  ICommentsServiceUpdate,
  ICommentsServiceFindOne,
  ICommentsServiceDelete,
} from './interfaces/comment-service.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @InjectRepository(Reply)
    private readonly replysRepository: Repository<Reply>,
  ) {}

  async findOne({ commentId }: ICommentsServiceFindOne): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['board'],
    });
    return comment;
  }

  async nullCheck({ comment }: ICommentServiceNullList): Promise<void> {
    // 댓글을 입력했는지 확인
    if (!comment.trim()) {
      throw new UnprocessableEntityException('댓글을 입력해주세요');
    } else if (comment.length > 100) {
      throw new BadRequestException('입력 할 수 있는단어를 초과했습니다');
    }
  }

  async create({
    createCommentInput,
  }: ICommentsServiceCreate): Promise<Comment> {
    const { comment, boardId } = createCommentInput;
    const board = await this.boardsRepository.findOne({
      where: {
        id: boardId, //id필드가 boardId 변수와 일치하는 board객체를 찾을때 사용하는 필터
      },
    });
    await this.nullCheck({ comment });
    return await this.commentsRepository.save({
      ...createCommentInput,
      board,
    });
  }

  async update({
    updateCommentInput,
  }: ICommentsServiceUpdate): Promise<Comment> {
    const { comment, commentId } = updateCommentInput;
    const comments = await this.findOne({ commentId });
    if (!comments) {
      throw new NotFoundException('댓글 아이디가 일치하지않습니다');
    }
    await this.nullCheck({ comment });
    return this.commentsRepository.save({
      ...comments,
      comment,
    });
  }

  async delete({ commentId }: ICommentsServiceDelete): Promise<string> {
    const isDeleted = await this.commentsRepository.delete(commentId);
    return isDeleted.affected ? '데이터삭제' : '데이터없음';
  }
}
