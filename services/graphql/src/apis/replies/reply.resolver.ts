import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateReplyInput } from "./dto/create-reply.input";
import { UpdateReplyInput } from "./dto/update.reply.input";
import { Reply } from "./entities/reply.entity";
import { ReplysService } from "./reply.service";


@Resolver()
export class ReplysResolver {
 constructor(
  private readonly replysService: ReplysService,
 ) {}

 @Query(() => Reply)
 fetchReply(
  @Args('replyId') replyId: string,
 ): Promise<Reply> {
  return this.replysService.findOne({ replyId })
 }

 @Query(() => [Reply])
 fetchReplys(
 ): Promise<Reply[]> {
  return this.replysService.findAll();
 }

 @Mutation(() => Reply)
 createReply(
  @Args('createReplyInput') createReplyInput: CreateReplyInput,
 ): Promise<Reply> {
   return this.replysService.create({ createReplyInput })
 }

 @Mutation(() => Reply)
 updateReply(
  @Args('updateReplyInput') updateReplyInput: UpdateReplyInput,
 ): Promise<Reply> {
  return this.replysService.update({ updateReplyInput })
 }

 @Mutation(() => String)
 deleteReply(
  @Args('replyId') replyId: string,
 ): Promise<string> {
  return this.replysService.delete({ replyId })
 }
}