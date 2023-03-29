import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../alarm/entities/alarm.entity';
import { Board } from '../boards/entities/board.entity';
import { Comment } from '../Comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';
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

    @InjectRepository(Alarm)
    private readonly alarmsRepository: Repository<Alarm>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne({ replyId }: IReplysServiceFindOne): Promise<Reply> {
    return this.replysRepository.findOne({
      where: {
        id: replyId,
      },
      relations: ['comments.board.user'],
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
  async create({ userId, createReplyInput }: IReplysServiceCreate): Promise<Reply> {
    const { reply, commentId } = createReplyInput;
    const user = await this.usersRepository.findOne({
      where: {
        id: userId, 
      },
    });
    const comments = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['board.user']
    });
    if (!comments) {
      throw new NotFoundException('현재 없는 댓글 입니다');
    }
    await this.nullCheck({ reply });
    const newComment = await this.replysRepository.save({
      ...createReplyInput,
      comments,
      user,
    });
    const newAlarm =  this.alarmsRepository.create({
      isAlarm: true,
      users: comments.board.user,
      replies: newComment,
      commentUserId: newComment.user.id,
      commentUserName: newComment.user.nickname,
    });
    await this.alarmsRepository.save(newAlarm);
    return newComment
  }

  async update({ updateReplyInput }: IReplysServiceUpdate): Promise<Reply> {
    const { reply, replyId } = updateReplyInput;
    const replies = await this.findOne({ replyId });
    if (!replies) {
      throw new NotFoundException('댓글 아이디가 일치하지않습니다');
    }
    await this.nullCheck({ reply });
    const updateComment = await this.replysRepository.save({
      ...replies,
      reply,
    });

    // const updateAlarm = await this.alarmsRepository.create({
    //   isAlarm: true,
    //   users: comments.board.user,
    //   comments: updateComment,
    //   commentUserId: updateComment.user.id,
    //   commentUserName: updateComment.user.nickname,
    // });

    return updateComment
  }

  async delete({ replyId }: IReplysServiceDelete): Promise<string> {
    const reply = await this.replysRepository.delete(replyId);
    return reply.affected ? '데이터삭제' : '데이터없음';
  }
}
