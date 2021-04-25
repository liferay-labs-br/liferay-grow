import {
  ClassType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

import { Pagination, PaginationQL } from '../interfaces';

enum SortBy {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

interface GetTypes {
  SortBy: typeof SortBy;
  PaginateObjectType: ClassType;
  getAllInput: ClassType;
}

registerEnumType(SortBy, {
  description: 'Class Types',
  name: 'SortBy',
});

function getTypes(
  suffix: string,
  entity: any,
  inputTypes: {
    create: ClassType;
    update: ClassType;
    filter: ClassType;
  },
): GetTypes {
  @ObjectType(`PaginateObject${suffix}`)
  class PaginateObjectType {
    @Field(() => Pagination)
    pagination: Pagination;

    @Field(() => [entity])
    rows: typeof InputType[];
  }

  @InputType(`getAllInput${suffix}`)
  class getAllInput extends PaginationQL {
    @Field(() => String, { nullable: true })
    orderBy?: string;

    @Field(() => SortBy, { nullable: true })
    sortBy?: SortBy;

    @Field(() => inputTypes.filter, { nullable: true })
    find?: typeof inputTypes.filter;
  }

  return {
    PaginateObjectType,
    SortBy,
    getAllInput,
  };
}

export default getTypes;
