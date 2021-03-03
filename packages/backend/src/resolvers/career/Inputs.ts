import { Field, InputType } from 'type-graphql';

@InputType()
class CareerBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateCareerInput extends CareerBaseInput {
  @Field({ nullable: true })
  carreerDepartament?: string;
}

@InputType()
class UpdateCareerInput extends CareerBaseInput {
  @Field({ nullable: true })
  carreerDepartament?: string;
}

@InputType()
class FilterCareerInput extends CareerBaseInput {}

export default {
  create: CreateCareerInput,
  filter: FilterCareerInput,
  update: UpdateCareerInput,
};
