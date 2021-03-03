import {
  Arg,
  ClassType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { MiddlewareBaseResolver, PaginationQL } from '../interfaces';
import { isAuth } from '../middlewares/isAuth';
import { execMiddleware, normalizePagination } from './globalMethods';

/**
 * @param suffix Suffix is used on queryNames, example suffix: getAllUser
 * @param entity TypeORM Entity
 * @param inputTypes object with create, update and optionally update inputTypes
 * @param middlewares optional middlewares to be applied in defaults functions
 */
export function createBaseResolver<classType extends ClassType>(
  suffix: string,
  entity: any,
  inputTypes: { create: classType; update: classType; filter?: classType },
  relations: string[] = [],
  middlewares?: MiddlewareBaseResolver,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @UseMiddleware(isAuth)
    @Query(() => [entity], { name: `getAll${suffix}` })
    async getAll(): Promise<ClassType[]> {
      return entity.find({ relations });
    }

    @UseMiddleware(isAuth)
    @Query(() => [entity], { name: `getAll${suffix}Filter` })
    async getAllFiltered(
      @Arg('data', () => inputTypes.filter || inputTypes.create) data: any,
    ): Promise<ClassType[]> {
      return entity.find({ relations, where: data });
    }

    @UseMiddleware(isAuth)
    @Query(() => [entity], { name: `getAll${suffix}Paginate` })
    async getAllPagination(
      @Arg('data', () => PaginationQL) data: PaginationQL,
    ): Promise<ClassType[]> {
      const { skip, take } = normalizePagination(data);
      return entity.find({ relations, skip, take });
    }

    @UseMiddleware(isAuth)
    @Query(() => entity, { name: `get${suffix}` })
    async get(@Arg('id', () => String) id: string): Promise<ClassType | Error> {
      const content = await entity.findOne({ relations, where: { id } });
      if (!content) {
        throw new Error(`${suffix} not found`);
      }
      return content;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => entity, { name: `create${suffix}` })
    async create(
      @Arg('data', () => inputTypes.create) data: any,
    ): Promise<ClassType | Error> {
      if (middlewares && middlewares.create) {
        await execMiddleware(entity, data, ...middlewares.create);
      }

      const { id } = await entity.create(data).save();

      return this.get(id);
    }

    @UseMiddleware(isAuth)
    @Mutation(() => entity, { name: `updateBy${suffix}ID` })
    async updateByID(
      @Arg('data', () => inputTypes.update) data: any,
      @Arg('id') id: string,
    ): Promise<ClassType | Error> {
      await entity.update(id, data);

      return this.get(id);
    }

    @UseMiddleware(isAuth)
    @Mutation(() => [entity], { name: `createMulti${suffix}` })
    async createMulti(
      @Arg('data', () => [inputTypes.create]) data: any[],
    ): Promise<ClassType[]> {
      const promises = data.map((obj) => entity.create(obj).save());
      const insertedData = await Promise.all(promises);
      return insertedData;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean, { name: `deleteBy${suffix}ID` })
    async deleteByID(@Arg('id', () => String) id: string): Promise<boolean> {
      if (middlewares && middlewares.delete) {
        await execMiddleware(entity, id, ...middlewares.delete);
      }

      const _entity = await this.get(id);
      if (!_entity) {
        throw new Error(`No data found on Entity: ${suffix}, ID: ${id}`);
      }
      const data = await entity.remove(_entity);
      return !!data;
    }

    async update(data: any, entityData: any): Promise<any> {
      for (const field in data) {
        entityData[field] = data[field];
      }
      return entity.save(entityData);
    }
  }

  return BaseResolver;
}
