import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './entities/dto/create-user.input';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  // -----이메일 인증하기-----
  @Mutation(() => String)
  async checkEmail(
    @Args('email') email: string, //
  ): Promise<string> {
    await this.userService.checkEmail({ email });
    await this.userService.isFindOneByEmail({ email });
    await this.userService.sendToTemplate({ email });
    return `${email}로 인증번호가 전송되었습니다.`;
  }

  // -----닉네임 중복확인-----
  @Query(() => User)
  isValidNickname(
    @Args('nickname') nickname: string, //
  ): Promise<User> {
    return this.userService.isFindOneByNickname({ nickname });
  }

  // -----회원가입-----
  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create({ createUserInput });
  }
}
