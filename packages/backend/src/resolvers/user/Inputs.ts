import { Field, InputType } from 'type-graphql';

@InputType()
class UserBaseInput {
  @Field()
  login: string;
}

@InputType()
export class CreateUserInput extends UserBaseInput {}

@InputType()
export class UpdateUserInput extends UserBaseInput {}

@InputType()
export class FilterUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  email?: string;
}
