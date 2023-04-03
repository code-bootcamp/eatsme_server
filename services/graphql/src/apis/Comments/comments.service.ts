import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from '../alarm/entities/alarm.entity';
import { BoardsService } from '../boards/boards.service';
import { UserService } from '../users/users.service';
import { Comment } from './entities/comment.entity';
import {
  ICommentServiceNullList,
  ICommentsServiceCreate,
  ICommentsServiceUpdate,
  ICommentsServiceFindOne,
  ICommentsServiceDelete,
  ICommentServiceCheckUser,
} from './interfaces/comment-service.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    @InjectRepository(Alarm)
    private readonly alarmsRepository: Repository<Alarm>,

    private readonly boardsService: BoardsService,

    private readonly usersService: UserService,
  ) {}

  async findOne({ commentId }: ICommentsServiceFindOne): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
      relations: ['board.user', 'replies'],
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

  // 댓글작성유저하고 로그인유저하고 일치하는지 확인
  async checkUser({
    userId,
    commentId,
  }: ICommentServiceCheckUser): Promise<void> {
    const user = await this.usersService.findOneByUser({ userId });
    //  = await this.usersRepository.findOne({ where: { id: userId } });
    const comments = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comments) {
      throw new NotFoundException('댓글정보가 일치하지않습니다');
    }
    if (user.id !== comments.user.id) {
      throw new NotFoundException('댓글 작성자가 아닙니다');
    }
  }

  //댓글 생성
  async create({
    context,
    createCommentInput,
  }: ICommentsServiceCreate): Promise<Comment> {
    const { comment, boardId } = createCommentInput;
    const user = await this.usersService.findOneByUser({
      userId: context.req.user.id,
    });

    const board = await this.boardsService.findOneByBoardId({ boardId });
    if (!board) {
      throw new UnprocessableEntityException('게시판정보가 없습니다');
    }

    await this.nullCheck({ comment });

    const newComment = await this.commentsRepository.save({
      ...createCommentInput,
      board,
      user,
    });

    const newAlarm = this.alarmsRepository.create({
      users: board.user,
      comments: newComment,
      alarmMessage: `${newComment.user.nickname}님이 댓글을 작성했습니다`,
    });
    await this.alarmsRepository.save(newAlarm);
    return newComment;
  }

  // 댓글 수정
  async update({
    userId,
    updateCommentInput,
  }: ICommentsServiceUpdate): Promise<Comment> {
    const { comment, commentId } = updateCommentInput;
    const comments = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    await this.checkUser({ userId, commentId });
    await this.nullCheck({ comment });
    const updateComment = await this.commentsRepository.save({
      ...comments,
      comment,
    });
    const updateAlarm = this.alarmsRepository.create({
      users: comments.user,
      comments: updateComment,
      alarmMessage: `${updateComment.user.nickname}님이 댓글을 수정했습니다`,
    });
    await this.alarmsRepository.save(updateAlarm);
    return updateComment;
  }

  async delete({ commentId, userId }: ICommentsServiceDelete): Promise<string> {
    await this.checkUser({ commentId, userId });
    const isDeleted = await this.commentsRepository.delete(commentId);
    return isDeleted.affected ? '데이터삭제' : '데이터없음';
  }
}
