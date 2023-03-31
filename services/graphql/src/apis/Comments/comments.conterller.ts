import { Body, Controller, Post } from "@nestjs/common";
import { BoardsService } from "../boards/boards.service";
import { CommentsService } from "./comments.service";
import { AlarmService } from "../alarm/alarms.service";
import { ICommentsServiceCreate } from "./interfaces/comment-service.interface";



@Controller('comments')
export class CommentController {
  constructor(
    private commentsService: CommentsService,
    private alarmsService: AlarmService,
    private boardsService: BoardsService,
  ) {}

  @Post()
  async create(@Body() IcommentsServiceCreate: ICommentsServiceCreate) {
    const comment = await this.commentsService.create(IcommentsServiceCreate);

    // 게시판을 작성한 사용자에게 알람을 보냅니다.
    const boardId = IcommentsServiceCreate.createCommentInput.boardId;
    const board = await this.boardsService.findOne({ boardId });
    const authorId = board.user.id;
    const commentUserId = comment.user.id;
    const commentUserName = comment.user.nickname
    await this.alarmsService.createCommentAlarm(comment.id, authorId, commentUserId, commentUserName);

    return comment;
  }
}