import { Request, Response } from 'express';
import * as csv from 'fast-csv';

import { getKnowledgeSkillsAndGaps } from '../utils/queries';
import { CSVController } from './CSV';

export class Reports extends CSVController {
  private fileName = 'data.csv';
  private headers = [
    'Skill',
    'Member',
    'Knowledge Level',
    'Mentor',
    'Role',
    'Email',
    'Location',
    'Teams',
  ];

  async getKnowledgeSkillAndGapsCSV(_: Request, res: Response): Promise<void> {
    const knowledgeSkillsAndGaps = await getKnowledgeSkillsAndGaps();

    const file = await csv.write(knowledgeSkillsAndGaps, {
      headers: this.headers,
    });

    const ws = await this.getFileWS(this.fileName);

    const path = `/${this.fileName}`;

    file
      .on('finish', function () {
        res.json({ path });
      })
      .pipe(ws);
  }
}
