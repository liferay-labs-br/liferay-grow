import { Field, InputType } from 'type-graphql';

@InputType()
class CareerBaseInput {
  @Field()
  name: string;
}

@InputType()
export class CreateCareerInput extends CareerBaseInput {
  @Field({ nullable: true })
  carreerDepartament?: string;
}

@InputType()
export class UpdateCareerInput extends CareerBaseInput {
  @Field({ nullable: true })
  carreerDepartament?: string;
}

@InputType()
export class FilterCareerInput extends CareerBaseInput {}
