import { Field, InputType } from 'type-graphql';

@InputType()
class RoleBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateRoleInput extends RoleBaseInput {}

@InputType()
class UpdateRoleInput extends RoleBaseInput {}

@InputType()
class FilterRoleInput extends RoleBaseInput {}

export default {
  create: CreateRoleInput,
  filter: FilterRoleInput,
  update: UpdateRoleInput,
};
