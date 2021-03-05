import { KnowledgeMatriz } from '../../entity/KnowledgeMatriz';
import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { GrowMapBaseInput } from './Inputs';

export const getKnowledgeEntities = async (
  data: GrowMapBaseInput,
): Promise<{
  knowledgeMatrizes: KnowledgeMatriz[];
  knowledgeSkills: KnowledgeSkill[];
}> => {
  const { knowledgeSkillDetails } = data;

  const knowledgeMatrizSetIds = [
    ...new Set(
      knowledgeSkillDetails.map(({ knowledgeMatrizId }) => knowledgeMatrizId),
    ),
  ];

  const knowledgeSkillSetIds = [
    ...new Set(
      knowledgeSkillDetails.map(({ knowledgeSkillId }) => knowledgeSkillId),
    ),
  ];

  const knowledgeMatrizes = await KnowledgeMatriz.findByIds(
    knowledgeMatrizSetIds,
  );

  const knowledgeSkills = await KnowledgeSkill.findByIds(knowledgeSkillSetIds);

  return {
    knowledgeMatrizes,
    knowledgeSkills,
  };
};
