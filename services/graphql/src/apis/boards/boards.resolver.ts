import { Body, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { FetchBoardsByEveryInput } from './dto/fetch-board-secton.input';
import { BoardReturn } from './dto/fetch-board.object';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => BoardReturn)
  fetchBoard(
    @Args('boardId') boardId: string, //
  ): Promise<BoardReturn> {
    return this.boardsService.fetchBoard({ boardId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [BoardReturn])
  fetchMyBoard(
    @Context() context: IContext, //
  ): Promise<BoardReturn[] | string> {
    return this.boardsService.fetchMyBoard({ context });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [BoardReturn])
  fetchMyLikeBoard(
    @Context() context: IContext, //
  ): Promise<BoardReturn[] | string> {
    return this.boardsService.fetchMyLikeBoard({ context });
  }

  @Query(() => [BoardReturn])
  fetchBoardsByEvery(
    @Args('fetchBoardsByEveryInput')
    fetchBoardsByEveryInput: FetchBoardsByEveryInput,
  ): Promise<BoardReturn[]> {
    return this.boardsService.findByEvery({ fetchBoardsByEveryInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardReturn)
  createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<BoardReturn> {
    const { id } = context.req.user;
    return this.boardsService.create(
      JSON.parse(JSON.stringify({ createBoardInput, id })),
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardReturn)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @Context() context: IContext,
  ): Promise<BoardReturn> {
    return this.boardsService.update({ updateBoardInput, context });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteBoard(
    @Args('boardId') boardId: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.boardsService.delete({ boardId, context });
  }
}
