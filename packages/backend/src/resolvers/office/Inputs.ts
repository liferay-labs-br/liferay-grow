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

  @Field({ nullable: true })
  address?: string;
}

@InputType()
class CreateOfficeInput extends OfficeBaseInput {}

@InputType()
class UpdateOfficeInput extends OfficeBaseInput {}

@InputType()
class FilterOfficeInput extends OfficeBaseInput {}

export default {
  create: CreateOfficeInput,
  filter: FilterOfficeInput,
  update: UpdateOfficeInput,
};
