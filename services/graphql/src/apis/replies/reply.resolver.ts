import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update.reply.input';
import { Reply } from './entities/reply.entity';
import { ReplysService } from './reply.service';

@Resolver()
export class ReplysResolver {
  constructor(private readonly replysService: ReplysService) {}

  @Query(() => Reply)
  fetchReply(@Args('replyId') replyId: string): Promise<Reply> {
    return this.replysService.findOne({ replyId });
  }

  @Query(() => [Reply])
  fetchReplys(): Promise<Reply[]> {
    return this.replysService.findAll();
  }
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reply)
  createReply(
    @Args('createReplyInput') createReplyInput: CreateReplyInput,
    @Context() context: IContext, //
  ): Promise<Reply> {
    return this.replysService.create({ createReplyInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reply)
  updateReply(
    @Args('updateReplyInput') updateReplyInput: UpdateReplyInput,
    @Context() context: IContext, //
  ): Promise<Reply> {
    return this.replysService.update({ updateReplyInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteReply(
    @Args('replyId') replyId: string, //
    @Context() context: IContext, //
  ): Promise<string> {
    return this.replysService.delete({ replyId });
  }
}
