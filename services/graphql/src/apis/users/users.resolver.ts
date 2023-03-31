import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CreateUserInput } from './dto/create-user.input';
import { MatchAuthNumberInput } from './dto/matchAuthNumber-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  // -----로그인회원 조회-----
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    return this.userService.findOneByUser({ userId: context.req.user.id });
  }

  //-----인증번호 확인매치-----
  @Mutation(() => String)
  async matchAuthNumber(
    @Args('matchtAuthNumberInput') matchAuthNumberInput: MatchAuthNumberInput,
  ) {
    return this.userService.matchAuthNumber({ matchAuthNumberInput });
  }

  // -----회원 조회-----

  @Query(() => User)
  fetchUser(@Args('userId') userId: string): Promise<User> {
    return this.userService.findOneByUser({ userId });
  }

  // -----이메일 인증하기-----
  @Mutation(() => String)
  async checkEmail(
    @Args('email') email: string, //
  ): Promise<string> {
    return this.userService.checkEmail({ email });
  }

  // -----닉네임 중복확인-----
  @Query(() => User)
  isValidNickname(
    @Args('nickname') nickname: string, //
  ): Promise<User> {
    return this.userService.isFindOneByNickname({ nickname });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Context() context: IContext,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const userId = context.req.user.id;
    return this.userService.updateUser({ userId, updateUserInput });
  }
}
