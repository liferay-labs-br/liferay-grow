import { getManager } from 'typeorm';

import { KnowledgeMatrizAverage } from '../resolvers/knowledge_matriz/Inputs';

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

export const getKnowledgeSummaryCount = (skillId: string): Promise<any[]> => {
  const manager = getManager();

  const knowledgeMatrizCountQuery = `SELECT count(km.name) AS total, km.name FROM knowledge_skill_details ksd 
  INNER JOIN grow_map_knowledge_skill_details gmksd ON ksd.id = gmksd.knowledgeSkillDetailsId
  INNER JOIN knowledge_skill ks ON ks.id = ksd.knowledgeSkillId
  INNER JOIN knowledge_matriz km ON km.id = ksd.knowledgeMatrizId
  WHERE ks.id = '${skillId}'
  GROUP BY km.name`;

  const knowledgeGapsCountQuery = `SELECT COUNT(*) AS total FROM knowledge_gaps_details kgd 
  INNER JOIN grow_map_knowledge_gaps_details gmkgd ON kgd.id = gmkgd.knowledgeGapsDetailsId
  INNER JOIN knowledge_skill ks ON ks.id = kgd.knowledgeSkillId
  WHERE kgd.knowledgeSkillId = '${skillId}'`;

  return Promise.all([
    manager.query(knowledgeMatrizCountQuery),
    manager.query(knowledgeGapsCountQuery),
  ]);
};

type KnowledgeSkillGap = {
  skill: string;
  userName: string;
  level: string;
  isMentor: boolean;
  rule: string;
  email: string;
  location: string;
};

export const getKnowledgeSkillsAndGaps = async (): Promise<
  KnowledgeSkillGap[]
> => {
  const baseQuery = `
  SELECT ks.name AS Skill,
      g.name AS Member,
      LEVEL AS 'Knowledge Level',
              CASE isMentor
                  WHEN 0 THEN 'No'
                  WHEN 1 THEN 'Yes'
              END AS Mentor,
              r.name AS Role,
              g.email AS Email,
              g.location AS Location,
      (SELECT GROUP_CONCAT(t.name) teams 
      FROM user_details_teams udt
      INNER JOIN team t ON udt.teamId = t.id
      INNER JOIN grow_map on grow_map.userDetailsId = udt.userDetailsId
      WHERE grow_map.id = gm.id
      GROUP BY udt.userDetailsId) AS Teams
  FROM
    (SELECT ksd.knowledgeSkillId,
          gmksd.growMapId,
          km.name AS LEVEL,
          ksd.isMentor
   FROM knowledge_skill_details ksd
   INNER JOIN grow_map_knowledge_skill_details gmksd ON ksd.id = gmksd.knowledgeSkillDetailsId
   INNER JOIN knowledge_matriz km ON ksd.knowledgeMatrizId = km.id
   UNION SELECT kgd.knowledgeSkillId,
                gmkgd.growMapId,
                'Knowledge Gap' AS LEVEL,
                0 AS isMentor
   FROM knowledge_gaps_details kgd
   INNER JOIN grow_map_knowledge_gaps_details gmkgd ON kgd.id = gmkgd.knowledgeGapsDetailsId) AS ksgd
   INNER JOIN knowledge_skill ks ON ksgd.knowledgeSkillId = ks.id
   INNER JOIN grow_map gm ON ksgd.growMapId = gm.id
   INNER JOIN user u ON gm.userId = u.id
   INNER JOIN user_details ud ON gm.userDetailsId = ud.id
   INNER JOIN role AS r ON ud.roleId = r.id
   INNER JOIN github g ON g.userId = u.id
   ORDER BY ks.name`.trim();

  const manager = getManager();

  const knowledgeSkillsAndGaps = await manager.query(baseQuery);

  return knowledgeSkillsAndGaps;
};
