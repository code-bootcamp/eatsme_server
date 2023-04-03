import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { UserService } from '../users/users.service';
import { ToggleLike } from './entities/toggleLike.entity';
import {
  IBoardsServiceToggleLike,
  IToggleLikeServicefindToggleLikeIds,
} from './interface/toggleLike-service.interface';

@Injectable()
export class ToggleLikeService {
  constructor(
    @InjectRepository(ToggleLike)
    private readonly toggleLikeRepository: Repository<ToggleLike>,

    private readonly userService: UserService,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService,
  ) {}

  async toggleLike({
    boardId,
    context,
  }: IBoardsServiceToggleLike): Promise<string> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    const isSave = user.toggleLikes.filter((el) => el.board.id === boardId);
    if (isSave.length) {
      await this.toggleLikeRepository.delete({ board: isSave[0].board });
      return '찜목록에서 삭제했습니다.';
    } else {
      const board = await this.boardsService.findOneByBoardId({
        boardId,
      });
      await this.toggleLikeRepository.save({
        user,
        board,
      });
      return '찜목록에 추가되었습니다.';
    }
  }
}
