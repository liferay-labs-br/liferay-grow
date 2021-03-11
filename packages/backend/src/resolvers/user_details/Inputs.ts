import { Field, InputType } from 'type-graphql';

@InputType()
export class UserDetailBaseInput {
  @Field()
  roleId: string;

  @Field(() => [String])
  teamsId: string[];
}
