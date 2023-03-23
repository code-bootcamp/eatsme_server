import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { GqlAuthGuard } from './guards/gql-auth.guards';

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

  @UseGuards(GqlAuthGuard('restore'))
  @Mutation(() => String)
  refreshAccessToken(
    @Context() context: IContext, //
  ): string {
    return this.authService.refreshAccessToken({ user: context.req.user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  logout(
    @Context() context: IContext, //
  ): Promise<string> {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    console.log(context.req.headers);
    const restoreToken = context.req.headers.cookie.split('=')[1];
    return this.authService.logout({ accessToken, restoreToken });
  }
}
