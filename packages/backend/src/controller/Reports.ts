import { Request, Response } from 'express';
import * as csv from 'fast-csv';

import { getKnowledgeSkillsAndGaps } from '../utils/queries';
import { CSVController } from './CSV';

export class Reports extends CSVController {
  async getKnowledgeSkillAndGapsCSV(_: Request, res: Response): Promise<void> {
    const path = '/data.csv';

    const knowledgeSkillsAndGaps = await getKnowledgeSkillsAndGaps();

    const file = await csv.write(knowledgeSkillsAndGaps, {
      headers: [
        'Skill',
        'Member',
        'Knowledge Level',
        'Mentor',
        'Role',
        'Email',
        'Location',
        'Teams',
      ],
    });

    const ws = await this.getFileWS('data.csv');

    file
      .on('finish', function () {
        res.json({ path });
      })
      .pipe(ws);
  }
}
