import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
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
  ) {}

  async findToggleLikeIds(
    { context }: IToggleLikeServicefindToggleLikeIds, //
  ): Promise<ToggleLike[]> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });

    return user.toggleLikes;
    // return aaa;
  }

  async toggleLike({
    toggleLikeInput,
    context,
  }: IBoardsServiceToggleLike): Promise<string> {
    const { isLike, boardId } = toggleLikeInput;
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    if (isLike) {
      const isValid = await this.toggleLikeRepository.find({
        where: { boardId, user },
      });
      if (isValid.length) return '이미 찜목록에 추가 되었습니다.';
      const isRegister = this.toggleLikeRepository.save({ boardId, user });
      if (isRegister) return '찜목록에 추가되었습니다.';
    } else {
      const isDelete = await this.toggleLikeRepository.delete({
        boardId,
        user,
      });
      return isDelete.affected
        ? '정상적으로 지워졌습니다.'
        : '이미 지워졌습니다.';
    }
  }
}
