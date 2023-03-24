
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  // -----로그인회원 조회-----
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchLoginUser(
    @Context() context: IContext, //
  ): string {
    console.log('================');
    console.log(context.req.user);
    console.log('================');
    return '인가에 성공하였습니다.';
  }

  // -----회원 조회-----

  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ): Promise<User> {
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
    return this.userService.create({ createUserInput });
  }

  // //-----비밀번호 인가-----  //로그인코드 만든 후 다시 작업
  // @Mutation(GqlAuthGuard('access')

  // //-----비밀번호변경 및 이미지 변경-----  //로그인코드 만든 후 다시 작업
  // @Mutation(() => User)
  // updateUser(
  //   @Args('userId') userId: string,
  //   @Args('password') password: string,
  //   @Args('userImg') userImg: string,
  // ): Promise<User> {
  //   return this.userService.update({ userId, password, userImg });
  // }

}
