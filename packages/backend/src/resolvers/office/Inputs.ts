import { Field, InputType } from 'type-graphql';

@InputType()
class OfficeBaseInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  country?: string;
}

@InputType()
export class CreateOfficeInput extends OfficeBaseInput {}

@InputType()
export class UpdateOfficeInput extends OfficeBaseInput {}

@InputType()
export class FilterOfficeInput extends OfficeBaseInput {}
