import { Field, InputType } from 'type-graphql';

@InputType()
class CareerDepartamentBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateCareerDepartamentInput extends CareerDepartamentBaseInput {}

@InputType()
class UpdateCareerDepartamentInput extends CareerDepartamentBaseInput {}

@InputType()
class FilterCareerDepartamentInput extends CareerDepartamentBaseInput {}

export default {
  create: CreateCareerDepartamentInput,
  filter: FilterCareerDepartamentInput,
  update: UpdateCareerDepartamentInput,
};
