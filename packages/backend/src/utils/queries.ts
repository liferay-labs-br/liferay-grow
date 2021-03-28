import { getManager } from 'typeorm';

import { KnowledgeMatrizAverage } from '../resolvers/team/Inputs';

export const getKnowledgeMatrizAverage = async ({
  skillId,
  teamId,
}: {
  skillId?: string;
  teamId?: string;
}): Promise<KnowledgeMatrizAverage[]> => {
  const getBaseQuery = (
    peace: string,
  ) => `SELECT AVG(km.matrizLevel) AS matrizLevelAvg, ks.* FROM knowledge_skill_details ksd 
    INNER JOIN grow_map_knowledge_skill_details gmksd ON ksd.id = gmksd.knowledgeSkillDetailsId
    INNER JOIN grow_map gm ON gmksd.growMapId = gm.id
    INNER JOIN knowledge_skill ks ON ks.id = ksd.knowledgeSkillId
    INNER JOIN knowledge_matriz km ON km.id = ksd.knowledgeMatrizId
    ${peace}
  
    GROUP BY ks.name`;

  let baseQuery = '';

  if (teamId) {
    baseQuery = getBaseQuery(
      `INNER JOIN user_details_teams udt ON udt.userDetailsId = gm.userDetailsId
       WHERE udt.teamId = '${teamId}'
`.trim(),
    );
  } else {
    baseQuery = getBaseQuery(`WHERE ks.id = '${skillId}'`);
  }
  const manager = getManager();

  const knowledgeMatrizAverage = await manager.query(baseQuery);

  return knowledgeMatrizAverage;
};
