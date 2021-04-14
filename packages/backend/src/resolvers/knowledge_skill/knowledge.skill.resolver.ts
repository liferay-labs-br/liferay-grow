import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';
import { createBaseResolver } from '../../utils/createBaseResolver';
import { getLoggedUserFromCtx } from '../../utils/globalMethods';
import Inputs, { CreateKnowledgeSkillInput } from './Inputs';

const relations = ['area'];

const BaseResolver = createBaseResolver<KnowledgeSkill>(
  'KnowledgeSkill',
  KnowledgeSkill,
  Inputs,
  relations,
  [],
);

@Resolver(KnowledgeSkill)
export class KnowledgeSkillResolver extends BaseResolver {
  @Query(() => KnowledgeSkill)
  async getKnowledgeSkillBySlug(
    @Arg('slug') slug: string,
  ): Promise<KnowledgeSkill> {
    const knowledgeSkill = await KnowledgeSkill.findOneOrFail({
      relations,
      where: { slug },
    });

    return knowledgeSkill;
  }

  @Mutation(() => KnowledgeSkill)
  @UseMiddleware(isAuth)
  async createKnowledgeSkill(
    @Ctx() ctx: MyContext,
    @Arg('data') data: CreateKnowledgeSkillInput,
  ): Promise<KnowledgeSkill | Error> {
    const loggedUser = getLoggedUserFromCtx(ctx);

    return this.create({ ...data, createdBy: loggedUser?.github_login });
  }
}
