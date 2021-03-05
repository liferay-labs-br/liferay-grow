import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { KnowledgeSkillDetails } from './KnowledgeSkillDetails';
import { MainEntity } from './MainEntity';
import { User } from './User';

@ObjectType()
@Entity()
export class GrowMap extends MainEntity {
  @Field(() => [KnowledgeSkillDetails], { nullable: true })
  @JoinTable()
  @ManyToMany(() => KnowledgeSkillDetails)
  knowledgeSkillDetails: KnowledgeSkillDetails[];

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
