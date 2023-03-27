import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { FetchBoardsBySectionInput } from './dto/fetch-board-secton.input';
import { FetchBoardInput } from './dto/fetch-board.input';
import { FetchBoardReturn } from './dto/fetch-board.object';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';
import { IBoardsServiceFetchBoardReturn } from './interfaces/board-service.interface';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => FetchBoardReturn)
  fetchBoard(
    @Args('fetchBoardInput') fetchBoardInput: FetchBoardInput, //
  ): Promise<IBoardsServiceFetchBoardReturn> {
    return this.boardsService.fetchBoard({ fetchBoardInput });
  }

  @Query(() => [FetchBoardReturn])
  fetchBoardsByArea(
    @Args('area') area: string, //
  ): Promise<IBoardsServiceFetchBoardReturn[]> {
    return this.boardsService.findArea({ area });
  }

  @Query(() => [FetchBoardReturn])
  fetchBoardsBySection(
    @Args('fetchBoardsWithSectionInput')
    fetchBoardsBySectionInput: FetchBoardsBySectionInput,
  ): Promise<IBoardsServiceFetchBoardReturn[]> {
    return this.boardsService.findByStartPoint(
      JSON.parse(JSON.stringify({ fetchBoardsBySectionInput })),
    );
  }

  @Mutation(() => Board)
  createBoard(
    @Args('userId') userId: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    // @Args('createBoardMapInput') createBoardMapInput: CreateBoardMapInput[],
  ): Promise<Board> {
    return this.boardsService.create(
      JSON.parse(JSON.stringify({ createBoardInput })),
    );
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardsService.update({ updateBoardInput });
  }

  @Mutation(() => String)
  deleteBoard(@Args('boardId') boardId: string): Promise<string> {
    return this.boardsService.delete({ boardId });
  }
}
