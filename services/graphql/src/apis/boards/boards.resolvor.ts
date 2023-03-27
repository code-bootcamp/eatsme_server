import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
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

  @Query(() => [Board])
  fetchBoards(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Mutation(() => Board)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<Board> {
    return this.boardsService.create({ createBoardInput });
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardsService.update({ updateBoardInput });
  }

  @Mutation(() => Boolean)
  deleteBoard(@Args('boardId') boardId: string): Promise<boolean> {
    return this.boardsService.delete({ boardId });
  }
}
