import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { Board } from '../boards/entities/board.entity';
import { ToggleLikeInput } from './dto/toggle-Like.input';
import { ToggleLikeService } from './toggleLike.service';

@Resolver()
export class ToggleLikeResolver {
  constructor(private readonly toggleLikeService: ToggleLikeService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  toggleLike(
    @Args('toggleLikeInput') toggleLikeInput: ToggleLikeInput, //
    @Context() context: IContext,
  ): Promise<string> {
    const { id: userId } = context.req.user;
    return this.toggleLikeService.toggleLike(
      JSON.parse(JSON.stringify({ toggleLikeInput, userId })),
    );
  }
}
