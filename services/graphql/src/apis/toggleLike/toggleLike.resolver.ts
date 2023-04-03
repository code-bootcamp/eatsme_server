import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { ToggleLikeService } from './toggleLike.service';

@Resolver()
export class ToggleLikeResolver {
  constructor(private readonly toggleLikeService: ToggleLikeService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  toggleLike(
    @Args('boardId') boardId: string, //
    @Context() context: IContext,
  ): Promise<string> {
    return this.toggleLikeService.toggleLike({ boardId, context });
  }
}
