import { Field, InputType } from 'type-graphql';

@InputType()
class TeamBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateTeamInput extends TeamBaseInput {
  @Field({ nullable: true })
  office?: string;
}

@InputType()
class UpdateTeamInput extends TeamBaseInput {
  @Field({ nullable: true })
  office?: string;
}

@InputType()
class FilterTeamInput extends TeamBaseInput {}

export default {
  create: CreateTeamInput,
  filter: FilterTeamInput,
  update: UpdateTeamInput,
};
