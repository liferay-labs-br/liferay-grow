import { Request, Response } from 'express';
import * as csv from 'fast-csv';

import { getKnowledgeSkillsAndGaps } from '../utils/queries';
import { CSVController } from './CSV';

export class Reports extends CSVController {
  private fileName = 'report.csv';

  private headers = [
    'Skill',
    'Member',
    'Knowledge Level',
    'Mentor',
    'Role',
    'Department',
    'Location',
    'Teams',
  ];

  async getKnowledgeSkillAndGapsCSV(_: Request, res: Response): Promise<void> {
    const knowledgeSkillsAndGaps = await getKnowledgeSkillsAndGaps();

    const file = await csv.write(knowledgeSkillsAndGaps, {
      headers: this.headers,
    });

    const ws = await this.getFileWS(this.fileName);

    const self = this; // eslint-disable-line

    file.pipe(ws).on('finish', () => {
      res.download(`${self.tempFolder}/${self.fileName}`);
    });
  }
}
