import { Args, Mutation, Query, Resolver  } from "@nestjs/graphql";
import { BoardsService } from "./boards.service";
import { CreateBoardInput } from "./dto/create-board.input";
import { UpdateBoardInput } from "./dto/update-board.input";
import { Board } from "./entities/board.entity";


@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,
  ) {}

  @Query(() => Board)
  fetchBoard(
    @Args('boardId') boardId: string, //
  ): Promise<Board> {
    return this.boardsService.findOne({ boardId });
  }

  @Query(() => [Board])
  fetchBoards(): Promise<Board[]> {
   return this.boardsService.findAll();
  }

  @Mutation(() => Board)
  createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<Board> {
    return this.boardsService.create({ createBoardInput }) 
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ): Promise<Board> {
    return this.boardsService.update({ boardId, updateBoardInput });
  }
}