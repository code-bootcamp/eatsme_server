import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../alarm/entities/alarm.entity';
import { CommentsService } from '../Comments/comments.service';
import { UserService } from '../users/users.service';
import { Reply } from './entities/reply.entity';
import {
  IReplyServiceCheckUser,
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

    @InjectRepository(Alarm)
    private readonly alarmsRepository: Repository<Alarm>,

    private readonly commentsService: CommentsService,

    private readonly usersService: UserService,
  ) {}

  findOne({ replyId }: IReplysServiceFindOne): Promise<Reply> {
    return this.replysRepository.findOne({
      where: {
        id: replyId,
      },
      relations: ['comments.board.user', 'comments.user', 'user'],
    });
  }

  nullCheck({ reply }: IReplyServiceNullList): void {
    // 댓글을 입력했는지 확인
    if (!reply.trim()) {
      throw new UnprocessableEntityException('댓글을 입력해주세요');
    } else if (reply.length > 100) {
      throw new BadRequestException('입력 할 수 있는단어를 초과했습니다');
    }
  }

  // 대댓글작성유저하고 로그인유저하고 일치하는지 확인
  async checkUser({ userId, replyId }: IReplyServiceCheckUser): Promise<void> {
    const user = await this.usersService.findOneByUser({ userId });

    const replies = await this.findOne({ replyId });

    if (!replies) {
      throw new NotFoundException('댓글정보가 일치하지않습니다');
    } else if (user.id !== replies.user.id) {
      throw new NotFoundException('댓글 작성자가 아닙니다');
    }
  }

  //대댓글 생성
  async create({
    context,
    createReplyInput,
  }: IReplysServiceCreate): Promise<Reply> {
    const { reply, commentId } = createReplyInput;

    const user = await this.usersService.findOneByUser({
      userId: context.req.user.id,
    });

    const comments = await this.commentsService.findOne({ commentId });

    this.nullCheck({ reply });

    const newComment = await this.replysRepository.save({
      ...createReplyInput,
      comments,
      user,
    });

    const boardUser = comments.board.user;
    const commentUser = comments.user;
    // 게시판 작성자와 댓글 작성자 및 댓글작성자와 대댓글작성자가 같은 경우 중복해서 알람을 보내지 않도록 처리
    let usersToSendAlarm = [];
    if (
      commentUser.id !== boardUser.id &&
      boardUser.id !== user.id &&
      commentUser.id !== user.id
    ) {
      usersToSendAlarm = [commentUser, boardUser];
    } else if (commentUser.id !== user.id) {
      usersToSendAlarm = [commentUser];
    } else if (boardUser.id !== user.id) {
      usersToSendAlarm = [boardUser];
    }
    // 두 명의 사용자에게 각각 알람을 보냅니다.
    usersToSendAlarm.forEach(async (el) => {
      await this.alarmsRepository.save({
        users: el,
        replies: newComment,
        commentUserImg: newComment.user.userImg,
        alarmMessage: `${newComment.user.nickname}님이 대댓글을 작성했습니다`,
      });
    });

    return newComment;
  }

  // 대댓글 수정
  async update({
    userId,
    updateReplyInput,
  }: IReplysServiceUpdate): Promise<Reply> {
    const { reply, replyId } = updateReplyInput;
    const replies = await this.findOne({ replyId });

    await this.checkUser({ userId, replyId });

    this.nullCheck({ reply });

    return this.replysRepository.save({
      ...replies,
      reply,
    });
  }

  async delete({ userId, replyId }: IReplysServiceDelete): Promise<string> {
    await this.checkUser({ replyId, userId });
    const reply = await this.replysRepository.delete(replyId);

    return reply.affected ? '데이터삭제' : '데이터없음';
  }
}
