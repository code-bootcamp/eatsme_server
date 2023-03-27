import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { IContext } from "src/commons/interfaces/context";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guards";
import { CommentsService } from "./comments.service";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { Comment } from "./entities/comment.entity";


@Resolver()
export class CommentsResolver {
 constructor(
  private readonly commentsService: CommentsService,
 ) {}

 @Query(() => [Comment])
 fetchComments(
  @Args('boardId') boardId: string)
  : Promise<Comment[]> {
  return this.commentsService.findAll(boardId);
 }

 @UseGuards(GqlAuthGuard('access'))
 @Mutation(() => Comment)
 createComment(
  @Args('boardId') boardId: string,
  @Args('createCommentInput') createCommentInput: CreateCommentInput,
  @Context() context: IContext,
 ): Promise<Comment> {
   return this.commentsService.create({ boardId, createCommentInput })
 }

 @UseGuards(GqlAuthGuard('access'))
 @Mutation(() => Comment)
 updateComment(
  @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  @Context() context: IContext,
 ): Promise<Comment> {
  return this.commentsService.update({ updateCommentInput })
 }

 @UseGuards(GqlAuthGuard('access'))
 @Mutation(() => String)
 deleteReply(
  @Args('commentId') commentId: string,
  @Context() context: IContext,
 ): Promise<string> {
  return this.commentsService.delete({ commentId })
 }
}