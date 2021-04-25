import {
  Arg,
  Authorized,
  ClassType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';

import { getAllPagination } from './baseResolverFN';
import getTypes from './getTypes';

/**
 * @param suffix Suffix is used on queryNames, example suffix: getAllUser
 * @param entity TypeORM Entity
 * @param inputTypes object with create, update and optionally update inputTypes
 * @param middlewares optional middlewares to be applied in useMiddlewares
 */

export function createBaseResolver<Entity>(
  suffix: string,
  entity: any,
  inputTypes: {
    create: ClassType;
    update: ClassType;
    filter: ClassType;
  },
  relations: string[] = [],
) {
  const { getAllInput, PaginateObjectType } = getTypes(
    suffix,
    entity,
    inputTypes,
  );

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Authorized()
    @Query(() => PaginateObjectType, { name: `getAll${suffix}` })
    async getAll(
      @Arg('data', () => getAllInput, { defaultValue: {}, nullable: true })
      data: any,
    ): Promise<any> {
      return getAllPagination(entity, data, relations);
    }

    @Authorized()
    @Query(() => entity, { name: `get${suffix}` })
    async getOne(@Arg('id', () => String) id: string): Promise<Entity | Error> {
      const content = await entity.findOne({ relations, where: { id } });
      if (!content) {
        throw new Error(`${suffix} not found`);
      }

      return content;
    }

    @Authorized()
    @Mutation(() => entity, { name: `create${suffix}` })
    async create(
      @Arg('data', () => inputTypes.create) data: any,
    ): Promise<Entity | Error> {
      const { id } = await entity.create(data).save();

      return this.getOne(id);
    }

    @Authorized()
    @Mutation(() => entity, { name: `updateBy${suffix}ID` })
    async updateByID(
      @Arg('data', () => inputTypes.update) data: any,
      @Arg('id') id: string,
    ): Promise<Entity | Error> {
      await entity.update(id, data);

      return this.getOne(id);
    }

    @Authorized()
    @Mutation(() => Boolean, { name: `deleteBy${suffix}ID` })
    async deleteByID(@Arg('id', () => String) id: string): Promise<boolean> {
      const _entity = await this.getOne(id);
      if (!_entity) {
        throw new Error(`No data found on Entity: ${suffix}, ID: ${id}`);
      }
      const data = await entity.remove(_entity);
      return !!data;
    }
  }

  return BaseResolver;
}
