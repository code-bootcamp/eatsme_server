import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { ToggleLike } from './entities/toggleLike.entity';
import { IBoardsServiceToggleLike } from './interface/toggleLike-service.interface';

@Injectable()
export class ToggleLikeService {
  constructor(
    @InjectRepository(ToggleLike)
    private readonly toggleLikeRepository: Repository<ToggleLike>,

    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async toggleLike({
    toggleLikeInput,
    userId,
  }: IBoardsServiceToggleLike): Promise<string> {
    const { isLike, boardId } = toggleLikeInput;

    if (isLike) {
      const result = await this.toggleLikeRepository.save({ boardId, userId });
      return '찜목록에 추가되었습니다.';
    } else {
      const isDelete = await this.toggleLikeRepository.delete({
        boardId,
        userId,
      });
      return isDelete.affected
        ? '정상적으로 지워졌습니다.'
        : '이미 지워졌습니다.';
    }
  }
}
