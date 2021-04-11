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
import { UserDetailBaseInput } from '../user_details/Inputs';
import {
  getKnowledgeEntities,
  saveKnowledgeGapsDetails,
  saveKnowledgeSkillDetails,
  saveUserDetails,
} from './grow.map.utils';
import {
  GrowMapBaseInput,
  GrowMapSkillDetailsInput,
  GrowMapSkillGapsInput,
} from './Inputs';

const relations = [
  'profile',
  'growMap',
  'growMap.knowledgeGapsDetails',
  'growMap.knowledgeGapsDetails.knowledgeSkill',
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
      logger.info(`${user.profile.name} already have a growMap, skipping.`);
      return user.growMap;
    }

    const { knowledgeMatrizes, knowledgeSkills } = await getKnowledgeEntities(
      data,
    );

    const growMap = await GrowMap.create();

    const knowledgeGapsDetails = await saveKnowledgeGapsDetails(
      knowledgeSkills,
      data.knowledgeGapsDetails,
    );

    const knowledgeSkillDetails = await saveKnowledgeSkillDetails(
      knowledgeMatrizes,
      knowledgeSkills,
      data.knowledgeSkillDetails,
    );

    const userDetails = await saveUserDetails(data.userDetails);

    user.growMap = growMap;

    growMap.knowledgeSkillDetails = knowledgeSkillDetails;
    growMap.knowledgeGapsDetails = knowledgeGapsDetails;
    growMap.userDetails = userDetails;
    growMap.user = user;

    await growMap.save();
    await user.save();

    return growMap;
  }

  @Mutation(() => Boolean, { name: 'updateGrowMapSkillDetails' })
  @UseMiddleware(isAuth)
  async updateGrowMapSkillDetails(
    @Arg('data') data: GrowMapSkillDetailsInput,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const user = await getUserFromCtxOrFail(ctx, relations);

    if (!user.growMap) {
      throw new Error('Grow Map not exists');
    }

    const knowledgeSkillsGrow = user.growMap.knowledgeSkillDetails;
    const { knowledgeSkillDetails = [] } = data;
    const { knowledgeMatrizes, knowledgeSkills } = await getKnowledgeEntities(
      data,
    );

    for (const knowledgeSkillDetail of knowledgeSkillsGrow) {
      const knowledgeSkill = knowledgeSkillDetails.find(
        ({ knowledgeSkillId }) =>
          knowledgeSkillId === knowledgeSkillDetail.knowledgeSkill.id,
      );

      if (knowledgeSkill) {
        knowledgeSkillDetail.isMentor = knowledgeSkill.isMentor;

        const knowledgeMatriz = knowledgeMatrizes.find(
          ({ id }) => id === knowledgeSkill.knowledgeMatrizId,
        );

        if (knowledgeMatriz) {
          knowledgeSkillDetail.knowledgeMatriz = knowledgeMatriz;
        }

        await knowledgeSkillDetail.save();
      } else {
        await knowledgeSkillDetail.remove();
      }
    }

    const knowledgeSkillsToAdd = knowledgeSkillDetails.filter(
      ({ knowledgeSkillId }) =>
        !knowledgeSkillsGrow.find(
          (skill) => skill.knowledgeSkill.id === knowledgeSkillId,
        ),
    );

    const newKnowledgeSkillDetails = await saveKnowledgeSkillDetails(
      knowledgeMatrizes,
      knowledgeSkills,
      knowledgeSkillsToAdd,
    );

    user.growMap.knowledgeSkillDetails = [
      ...user.growMap.knowledgeSkillDetails,
      ...newKnowledgeSkillDetails,
    ];

    await user.growMap.save();

    return true;
  }

  @Mutation(() => Boolean, { name: 'updateGrowMapGapsDetails' })
  @UseMiddleware(isAuth)
  async updateGrowMapGapsDetails(
    @Arg('data') data: GrowMapSkillGapsInput,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const user = await getUserFromCtxOrFail(ctx, relations);

    if (!user.growMap) {
      throw new Error('Grow Map not exists');
    }

    const knowledgeGapsGrow = user.growMap.knowledgeGapsDetails;
    const { knowledgeGapsDetails = [] } = data;
    const { knowledgeSkills } = await getKnowledgeEntities(data);

    for (const knowledgeGapDetail of knowledgeGapsGrow) {
      const knowledgeSkill = knowledgeGapsDetails.find(
        ({ knowledgeSkillId }) =>
          knowledgeSkillId === knowledgeGapDetail.knowledgeSkill.id,
      );

      if (!knowledgeSkill) {
        await knowledgeGapDetail.remove();
      }
    }

    const knowledgeGapsToAdd = knowledgeGapsDetails.filter(
      ({ knowledgeSkillId }) =>
        !knowledgeGapsGrow.find(
          (skill) => skill.knowledgeSkill.id === knowledgeSkillId,
        ),
    );

    const newKnowledgeGapsDetails = await saveKnowledgeGapsDetails(
      knowledgeSkills,
      knowledgeGapsToAdd,
    );

    user.growMap.knowledgeGapsDetails = [
      ...user.growMap.knowledgeGapsDetails,
      ...newKnowledgeGapsDetails,
    ];

    await user.growMap.save();

    return true;
  }

  @Mutation(() => Boolean, { name: 'updateGrowMapOfficeDetails' })
  @UseMiddleware(isAuth)
  async updateGrowMapOfficeDetails(
    @Arg('data') data: UserDetailBaseInput,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const user = await getUserFromCtxOrFail(ctx, [
      ...relations,
      'growMap.userDetails',
    ]);

    if (!user.growMap) {
      throw new Error('Grow Map not exists');
    }

    await saveUserDetails(data, user.growMap.userDetails);

    return true;
  }

  @Query(() => [GrowMap], { name: 'getAllGrowMaps' })
  async getAllGrowMaps(): Promise<GrowMap[]> {
    const GrowMaps = await GrowMap.find({
      relations: [
        'userDetails',
        'userDetails.office',
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
