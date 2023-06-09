import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
