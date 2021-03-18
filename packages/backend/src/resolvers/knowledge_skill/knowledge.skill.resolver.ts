import { Arg, Query, Resolver } from 'type-graphql';

import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const relations = ['area'];

const BaseResolver = createBaseResolver(
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
}
