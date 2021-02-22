import { Field, InputType } from 'type-graphql';

@InputType()
class TeamBaseInput {
  @Field()
  name: string;
}

@InputType()
export class CreateTeamInput extends TeamBaseInput {}

@InputType()
export class UpdateTeamInput extends TeamBaseInput {
  @Field()
  office: string;
}

@InputType()
export class FilterTeamInput extends TeamBaseInput {}
