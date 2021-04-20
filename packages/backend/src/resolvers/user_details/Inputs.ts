import { Field, InputType } from 'type-graphql';

@InputType()
export class UserDetailBaseInput {
  @Field()
  departmentId: string;

  @Field()
  officeId: string;

  @Field()
  roleId: string;

  @Field(() => [String])
  teamsId: string[];
}
