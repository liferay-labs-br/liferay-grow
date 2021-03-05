import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { KnowledgeMatriz } from './KnowledgeMatriz';
import { KnowledgeSkill } from './KnowledgeSkill';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity()
export class KnowledgeSkillDetails extends MainEntity {
  @JoinColumn()
  @Field(() => KnowledgeSkill, { nullable: true })
  @OneToOne(() => KnowledgeSkill, { createForeignKeyConstraints: false })
  knowledgeSkill: KnowledgeSkill;

  @JoinColumn()
  @Field(() => KnowledgeMatriz, { nullable: true })
  @OneToOne(() => KnowledgeMatriz, { createForeignKeyConstraints: false })
  knowledgeMatriz: KnowledgeMatriz;

  @Field()
  @Column()
  isMentor: boolean;
}
