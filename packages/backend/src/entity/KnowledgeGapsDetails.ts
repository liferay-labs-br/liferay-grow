import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

import { KnowledgeSkill } from './KnowledgeSkill';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity()
export class KnowledgeGapsDetails extends MainEntity {
  @JoinColumn()
  @Field(() => KnowledgeSkill, { nullable: true })
  @OneToOne(() => KnowledgeSkill, { createForeignKeyConstraints: false })
  knowledgeSkill: KnowledgeSkill;
}
