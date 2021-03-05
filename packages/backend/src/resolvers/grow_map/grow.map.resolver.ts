import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { GrowMap } from '../../entity/GrowMap';
import { KnowledgeSkillDetails } from '../../entity/KnowledgeSkillDetails';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';
import { getUserFromCtxOrFail, logger } from '../../utils/globalMethods';
import { getKnowledgeEntities } from './grow.map.utils';
import { GrowMapBaseInput } from './Inputs';

@Resolver(GrowMap)
export class GrowMapResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => GrowMap, { name: 'createGrowMap' })
  async createGrowMap(
    @Arg('data') data: GrowMapBaseInput,
    @Ctx() ctx: MyContext,
  ): Promise<GrowMap> {
    const user = await getUserFromCtxOrFail(ctx, [
      'github',
      'growMap',
      'growMap.knowledgeSkillDetails',
      'growMap.knowledgeSkillDetails.knowledgeSkill',
      'growMap.knowledgeSkillDetails.knowledgeMatriz',
    ]);

    if (user.growMap) {
      logger.info(`${user.github.name} already have a growMap, skipping.`);
      return user.growMap;
    }

    const { knowledgeMatrizes, knowledgeSkills } = await getKnowledgeEntities(
      data,
    );

    const growMap = await GrowMap.create();

    const growDetails: KnowledgeSkillDetails[] = [];

    for (const {
      isMentor,
      knowledgeMatrizId,
      knowledgeSkillId,
    } of data.knowledgeSkillDetails) {
      const growDetail = await KnowledgeSkillDetails.create({
        isMentor,
      }).save();

      const knowledgeSkill = knowledgeSkills.find(
        ({ id }) => id === knowledgeSkillId,
      );

      const knowledgeMatriz = knowledgeMatrizes.find(
        ({ id }) => id === knowledgeMatrizId,
      );

      if (knowledgeSkill && knowledgeMatriz) {
        growDetail.knowledgeSkill = knowledgeSkill;
        growDetail.knowledgeMatriz = knowledgeMatriz;
      }

      await growDetail.save();

      growDetails.push(growDetail);
    }

    user.growMap = growMap;
    growMap.knowledgeSkillDetails = growDetails;
    growMap.user = user;

    await growMap.save();
    await user.save();

    return growMap;
  }

  @Query(() => [GrowMap], { name: 'getAllGrowMaps' })
  async getAllGrowMaps(): Promise<GrowMap[]> {
    const GrowMaps = await GrowMap.find({
      relations: [
        'knowledgeSkillDetails',
        'knowledgeSkillDetails.knowledgeSkill',
        'knowledgeSkillDetails.knowledgeMatriz',
        'user',
      ],
    });

    return GrowMaps;
  }
}
