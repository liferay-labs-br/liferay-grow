import { KnowledgeGapsDetails } from '../../entity/KnowledgeGapsDetails';
import { KnowledgeMatriz } from '../../entity/KnowledgeMatriz';
import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { KnowledgeSkillDetails } from '../../entity/KnowledgeSkillDetails';
import { Role } from '../../entity/Role';
import { Team } from '../../entity/Team';
import { UserDetails } from '../../entity/UserDetails';
import { KnowledgeGapsDetailBaseInput } from '../knowledge_gaps_detail/Inputs';
import { KnowledgeSkillDetailBaseInput } from '../knowledge_skill_detail/Inputs';
import { GrowMapBaseInput } from './Inputs';

const getKnowledgeSkills = ({
  knowledgeSkillId,
}: {
  knowledgeSkillId: string;
}) => knowledgeSkillId;

export const getKnowledgeEntities = async ({
  knowledgeGapsDetails = [],
  knowledgeSkillDetails = [],
}: {
  knowledgeGapsDetails?: KnowledgeGapsDetailBaseInput[];
  knowledgeSkillDetails?: KnowledgeSkillDetailBaseInput[];
}): Promise<{
  knowledgeMatrizes: KnowledgeMatriz[];
  knowledgeSkills: KnowledgeSkill[];
}> => {
  const knowledgeMatrizSetIds = [
    ...new Set(
      knowledgeSkillDetails.map(({ knowledgeMatrizId }) => knowledgeMatrizId),
    ),
  ];

  const knowledgeSkillSetIds = [
    ...new Set(knowledgeSkillDetails.map(getKnowledgeSkills)),
    ...new Set(knowledgeGapsDetails.map(getKnowledgeSkills)),
  ];

  const [knowledgeMatrizes, knowledgeSkills] = await Promise.all([
    KnowledgeMatriz.findByIds(knowledgeMatrizSetIds),
    KnowledgeSkill.findByIds(knowledgeSkillSetIds),
  ]);

  return {
    knowledgeMatrizes,
    knowledgeSkills,
  };
};

export const saveKnowledgeSkillDetails = async (
  knowledgeMatrizes: KnowledgeMatriz[],
  knowledgeSkills: KnowledgeSkill[],
  knowledgeInput: KnowledgeSkillDetailBaseInput[],
): Promise<KnowledgeSkillDetails[]> => {
  const knowledgeSkillDetails = [];

  for (const {
    isMentor,
    knowledgeMatrizId,
    knowledgeSkillId,
  } of knowledgeInput) {
    const knowledgeSkillDetail = await KnowledgeSkillDetails.create({
      isMentor,
    }).save();

    const knowledgeSkill = knowledgeSkills.find(
      ({ id }) => id === knowledgeSkillId,
    );

    const knowledgeMatriz = knowledgeMatrizes.find(
      ({ id }) => id === knowledgeMatrizId,
    );

    if (knowledgeSkill && knowledgeMatriz) {
      knowledgeSkillDetail.knowledgeSkill = knowledgeSkill;
      knowledgeSkillDetail.knowledgeMatriz = knowledgeMatriz;
    }

    await knowledgeSkillDetail.save();

    knowledgeSkillDetails.push(knowledgeSkillDetail);
  }

  return knowledgeSkillDetails;
};

export const saveKnowledgeGapsDetails = async (
  knowledgeSkills: KnowledgeSkill[],
  knowledgeInput: KnowledgeGapsDetailBaseInput[],
): Promise<KnowledgeGapsDetails[]> => {
  const knowledgeGapsDetails: KnowledgeGapsDetails[] = [];

  for (const { knowledgeSkillId } of knowledgeInput) {
    const knowledgeGapsDetail = await KnowledgeGapsDetails.create().save();

    const knowledgeSkill = knowledgeSkills.find(
      ({ id }) => id === knowledgeSkillId,
    );

    if (knowledgeSkill) {
      knowledgeGapsDetail.knowledgeSkill = knowledgeSkill;
    }

    await knowledgeGapsDetail.save();

    knowledgeGapsDetails.push(knowledgeGapsDetail);
  }

  return knowledgeGapsDetails;
};

export const saveUserDetails = async ({
  userDetails: { roleId, teamsId },
}: GrowMapBaseInput): Promise<UserDetails> => {
  const [role, teams] = await Promise.all([
    Role.findOne(roleId),
    Team.findByIds([...new Set(teamsId)]),
  ]);

  const userDetail = await UserDetails.create();

  userDetail.role = role;
  userDetail.teams = teams;

  await userDetail.save();

  return userDetail;
};
