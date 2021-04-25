import { Field, InputType, ObjectType } from 'type-graphql';

import { SortBy } from '.';

@ObjectType()
export class Pagination {
  @Field()
  currentPage: number;

  @Field()
  endIndex: number;

  @Field()
  endPage: number;

  @Field()
  pageSize: number;

  @Field(() => [Number])
  pages: number[];

  @Field()
  startIndex: number;

  @Field()
  startPage: number;

  @Field()
  totalItems: number;

  @Field()
  totalPages: number;

  @Field({ nullable: true })
  nextPage?: boolean;
}
@InputType()
export class PaginationQL {
  @Field({ nullable: true })
  pageIndex?: number;

  @Field({ nullable: true })
  pageSize?: number;
}

@InputType()
export class RetrievePaginationAndFilter extends PaginationQL {
  @Field(() => String, { nullable: true })
  order?: string;

  @Field(() => SortBy, { nullable: true })
  sort?: SortBy;
}
