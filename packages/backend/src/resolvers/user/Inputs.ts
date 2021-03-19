import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../../entity/User';
import { Pagination, PaginationQL } from '../../interfaces';

@ObjectType()
export class UserPaginationObject {
  @Field(() => Pagination)
  pagination: Pagination;

  @Field(() => [User])
  rows: User[];
}

@InputType()
export class UserPaginationInput extends PaginationQL {}
