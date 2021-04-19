import { Field, InputType } from 'type-graphql';

@InputType()
class DepartmentBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateDepartmentInput extends DepartmentBaseInput {}

@InputType()
class UpdateDepartmentInput extends DepartmentBaseInput {}

@InputType()
class FilterDepartmentInput extends DepartmentBaseInput {}

export default {
  create: CreateDepartmentInput,
  filter: FilterDepartmentInput,
  update: UpdateDepartmentInput,
};
