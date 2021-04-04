import * as csv from 'fast-csv';

import { getKnowledgeSkillsAndGaps } from './utils/queries';

export const exportCSV = async () => {
  const knowledgeSkillsAndGaps = await getKnowledgeSkillsAndGaps();
  return csv.write(knowledgeSkillsAndGaps, {
    headers: [
      'skill',
      'userName',
      'level',
      'mentor',
      'rule',
      'email',
      'location',
    ],
  });
};
