import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

import { GrowMap } from '../../entity/GrowMap';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';
import { getUserFromCtxOrFail, logger } from '../../utils/globalMethods';
import {
  getKnowledgeEntities,
  saveKnowledgeGapsDetails,
  saveKnowledgeSkillDetails,
  saveUserDetails,
} from './grow.map.utils';
import { GrowMapBaseInput } from './Inputs';

const relations = [
  'github',
  'growMap',
  'growMap.knowledgeSkillDetails',
  'growMap.knowledgeSkillDetails.knowledgeSkill',
  'growMap.knowledgeSkillDetails.knowledgeMatriz',
];

@Resolver(GrowMap)
export class GrowMapResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => GrowMap, { name: 'createGrowMap' })
  async createGrowMap(
    @Arg('data') data: GrowMapBaseInput,
    @Ctx() ctx: MyContext,
  ): Promise<GrowMap> {
    const user = await getUserFromCtxOrFail(ctx, relations);

    if (user.growMap) {
      logger.info(`${user.github.name} already have a growMap, skipping.`);
      return user.growMap;
    }

    const { knowledgeMatrizes, knowledgeSkills } = await getKnowledgeEntities(
      data,
    );

    const growMap = await GrowMap.create();

    const knowledgeGapsDetails = await saveKnowledgeGapsDetails(
      knowledgeSkills,
      data,
    );

    const knowledgeSkillDetails = await saveKnowledgeSkillDetails(
      knowledgeMatrizes,
      knowledgeSkills,
      data,
    );

    const userDetails = await saveUserDetails(data);

    user.growMap = growMap;

    growMap.knowledgeSkillDetails = knowledgeSkillDetails;
    growMap.knowledgeGapsDetails = knowledgeGapsDetails;
    growMap.userDetails = userDetails;
    growMap.user = user;

    await growMap.save();
    await user.save();

    return growMap;
  }

  @Query(() => [GrowMap], { name: 'getAllGrowMaps' })
  async getAllGrowMaps(): Promise<GrowMap[]> {
    const GrowMaps = await GrowMap.find({
      relations: [
        'userDetails',
        'userDetails.role',
        'userDetails.teams',
        'knowledgeGapsDetails',
        'knowledgeGapsDetails.knowledgeSkill',
        'knowledgeSkillDetails',
        'knowledgeSkillDetails.knowledgeSkill',
        'knowledgeSkillDetails.knowledgeMatriz',
        'user',
      ],
    });

    return GrowMaps;
  }
}
