import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CommentsService } from "./comments.service";
import { CreateCommentInput } from "./dto/create-comment.input";
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

 @Mutation(() => Comment)
 createComment(
  @Args('boardId') boardId: string,
  @Args('createCommentInput') createCommentInput: CreateCommentInput,
 ): Promise<Comment> {
   return this.commentsService.create({  boardId, createCommentInput })
 }
}