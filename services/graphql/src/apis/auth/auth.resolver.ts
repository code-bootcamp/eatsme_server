import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('loginAuthInput') loginAuthInput: LoginAuthInput,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ loginAuthInput, context });
  }
}
