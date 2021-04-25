import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../../entity/User';
import { Pagination, RetrievePaginationAndFilter } from '../../interfaces';

@ObjectType()
export class UserPaginationObject {
  @Field(() => Pagination)
  pagination: Pagination;

  @Field(() => [User])
  rows: User[];
}

@InputType()
class UserInput {
  @Field(() => String)
  name?: string;
}

@InputType()
export class UserPaginationInput extends RetrievePaginationAndFilter {
  @Field(() => UserInput, { nullable: true })
  find?: UserInput;
}
