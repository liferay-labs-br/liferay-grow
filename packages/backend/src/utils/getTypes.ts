import {
  ClassType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

import { Pagination, RetrievePaginationAndFilter, SortBy } from '../interfaces';

interface GetTypes {
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
  class getAllInput extends RetrievePaginationAndFilter {
    @Field(() => inputTypes.filter, { nullable: true })
    find?: typeof inputTypes.filter;
  }

  return {
    PaginateObjectType,
    getAllInput,
  };
}

export default getTypes;
