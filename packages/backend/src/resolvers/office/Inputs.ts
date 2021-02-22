import { Field, InputType } from 'type-graphql';

@InputType()
class OfficeBaseInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;
}

@InputType()
export class CreateOfficeInput extends OfficeBaseInput {}

@InputType()
export class UpdateOfficeInput extends OfficeBaseInput {}

@InputType()
export class FilterOfficeInput extends OfficeBaseInput {}
