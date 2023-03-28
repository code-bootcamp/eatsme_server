import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { Comment } from '../Comments/entities/comment.entity';
import { Reply } from './entities/reply.entity';
import {
  IReplyServiceNullList,
  IReplysServiceCreate,
  IReplysServiceDelete,
  IReplysServiceFindOne,
  IReplysServiceUpdate,
} from './interfaces/reply.service.interface';

@Injectable()
export class ReplysService {
  constructor(
    @InjectRepository(Reply)
    private readonly replysRepository: Repository<Reply>,

    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  findOne({ replyId }: IReplysServiceFindOne): Promise<Reply> {
    return this.replysRepository.findOne({
      where: {
        id: replyId,
      },
      relations: ['comments', 'comments.board', 'comments.board.user'],
    });
  }

  async nullCheck({ reply }: IReplyServiceNullList): Promise<void> {
    // 댓글을 입력했는지 확인
    if (!reply.trim()) {
      throw new UnprocessableEntityException('댓글을 입력해주세요');
    } else if (reply.length > 100) {
      throw new BadRequestException('입력 할 수 있는단어를 초과했습니다');
    }
  }

  //대댓글 생성
  async create({ createReplyInput }: IReplysServiceCreate): Promise<Reply> {
    console.log(createReplyInput);
    const { reply, commentId } = createReplyInput;
    const comments = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comments) {
      throw new NotFoundException('현재 없는 댓글 입니다');
    }
    await this.nullCheck({ reply });
    return this.replysRepository.save({
      ...createReplyInput,
      comments,
    });
  }

  async update({ updateReplyInput }: IReplysServiceUpdate): Promise<Reply> {
    const { reply, replyId } = updateReplyInput;
    const replies = await this.findOne({ replyId });
    if (!replies) {
      throw new NotFoundException('댓글 아이디가 일치하지않습니다');
    }
    await this.nullCheck({ reply });
    return this.replysRepository.save({
      ...replies,
      reply,
    });
  }

  async delete({ replyId }: IReplysServiceDelete): Promise<string> {
    const reply = await this.replysRepository.delete(replyId);
    return reply.affected ? '데이터삭제' : '데이터없음';
  }
}
