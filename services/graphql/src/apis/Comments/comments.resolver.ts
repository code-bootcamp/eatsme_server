import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Context() context: IContext,
  ): Promise<Comment> {
    const userId = context.req.user.id
    return this.commentsService.create({ createCommentInput, userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @Context() context: IContext,
  ): Promise<Comment> {
    return this.commentsService.update(
      JSON.parse(JSON.stringify({ updateCommentInput })),
    );
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteComment(
    @Args('commentId') commentId: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.commentsService.delete({ commentId });
  }
}
