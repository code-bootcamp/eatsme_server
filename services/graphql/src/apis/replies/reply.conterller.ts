import { Body, Controller, Post } from "@nestjs/common";
import { BoardsService } from "../boards/boards.service";
import { AlarmService } from "../alarm/alarms.service";
import { ReplysService } from "./reply.service";
import { IReplysServiceCreate } from "./interfaces/reply.service.interface";
import { CommentsService } from "../Comments/comments.service";




@Controller('replies')
export class ReplyController {
  constructor(
    private replysService: ReplysService,
    private alarmsService: AlarmService,
    private boardsService: BoardsService,
    private commentsService: CommentsService,
  ) {}

  @Post()
  async create(@Body() IReplysServiceCreate: IReplysServiceCreate) {
    const reply = await this.replysService.create(IReplysServiceCreate);

    // 댓글을 작성한 사용자에게 알람을 보냅니다.
    const commentId = IReplysServiceCreate.createReplyInput.commentId;
    const comment = await this.commentsService.findOne({ commentId });
    const authorId = comment.board.user.id;
    const commentUserId = reply.user.id;
    const commentUserName = reply.user.nickname
    await this.alarmsService.createReplyAlarm(reply.id, authorId, commentUserId, commentUserName);
    return reply;
  }
}