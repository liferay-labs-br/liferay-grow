import { Field, InputType } from 'type-graphql';

@InputType()
class CareerDepartamentBaseInput {
  @Field()
  name: string;
}

@InputType()
export class CreateCareerDepartamentInput extends CareerDepartamentBaseInput {}

@InputType()
export class UpdateCareerDepartamentInput extends CareerDepartamentBaseInput {}

@InputType()
export class FilterCareerDepartamentInput extends CareerDepartamentBaseInput {}
