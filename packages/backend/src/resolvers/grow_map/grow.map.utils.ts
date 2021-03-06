import { KnowledgeMatriz } from '../../entity/KnowledgeMatriz';
import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { GrowMapBaseInput } from './Inputs';

export const getKnowledgeEntities = async (
  data: GrowMapBaseInput,
): Promise<{
  knowledgeMatrizes: KnowledgeMatriz[];
  knowledgeSkills: KnowledgeSkill[];
}> => {
  const { knowledgeGapsDetails, knowledgeSkillDetails } = data;

  const knowledgeMatrizSetIds = [
    ...new Set(
      knowledgeSkillDetails.map(({ knowledgeMatrizId }) => knowledgeMatrizId),
    ),
  ];

  const getKnowledgeSkills = ({
    knowledgeSkillId,
  }: {
    knowledgeSkillId: string;
  }) => knowledgeSkillId;

  const knowledgeSkillSetIds = [
    ...new Set(knowledgeSkillDetails.map(getKnowledgeSkills)),
    ...new Set(knowledgeGapsDetails.map(getKnowledgeSkills)),
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
