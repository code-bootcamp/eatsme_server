import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { FetchBoardsBySectionInput } from './dto/fetch-board-secton.input';
import { FetchBoardInput } from './dto/fetch-board.input';
import { BoardReturn } from './dto/fetch-board.object';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}


  @Query(() => BoardReturn)
  fetchBoard(
    @Args('fetchBoardInput') fetchBoardInput: FetchBoardInput, //
  ): Promise<BoardReturn> {
    return this.boardsService.fetchBoard({ fetchBoardInput });
  }

  @Query(() => [BoardReturn])
  fetchBoardsByArea(
    @Args('area') area: string, //
  ): Promise<BoardReturn[]> {
    return this.boardsService.findArea({ area });
  }

  @Query(() => [BoardReturn])
  fetchBoardsBySection(
    @Args('fetchBoardsWithSectionInput')
    fetchBoardsBySectionInput: FetchBoardsBySectionInput,
  ): Promise<BoardReturn[]> {
    return this.boardsService.findByStartPoint(
      JSON.parse(JSON.stringify({ fetchBoardsBySectionInput })),
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardReturn)
  createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<BoardReturn> {
    return this.boardsService.create(
      JSON.parse(JSON.stringify({ createBoardInput })),
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardReturn)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @Context() context: IContext,
  ): Promise<BoardReturn> {
    return this.boardsService.update(
      JSON.parse(JSON.stringify({ updateBoardInput })),
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteBoard(
    @Args('boardId') boardId: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.boardsService.delete({ boardId });
  }
}
