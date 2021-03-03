import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import KnowledgeMatrizSeed from '../seed/knowledge.matriz.seed';

export class SeedKnowledgeMatriz1614715627090 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('knowledge_matriz').save(KnowledgeMatrizSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('knowledge_matriz');
  }
}
