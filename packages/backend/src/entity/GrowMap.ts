import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { KnowledgeGapsDetails } from './KnowledgeGapsDetails';
import { KnowledgeSkillDetails } from './KnowledgeSkillDetails';
import { MainEntity } from './MainEntity';
import { User } from './User';
import { UserDetails } from './UserDetails';

@ObjectType()
@Entity()
export class GrowMap extends MainEntity {
  @Field(() => [KnowledgeSkillDetails], { nullable: true })
  @JoinTable({ name: 'grow_map_knowledge_skill_details' })
  @ManyToMany(() => KnowledgeSkillDetails)
  knowledgeSkillDetails: KnowledgeSkillDetails[];

  @Field(() => [KnowledgeGapsDetails], { nullable: true })
  @JoinTable({ name: 'grow_map_knowledge_gaps_details' })
  @ManyToMany(() => KnowledgeGapsDetails)
  knowledgeGapsDetails: KnowledgeGapsDetails[];

  @Field(() => UserDetails)
  @OneToOne(() => UserDetails)
  @JoinColumn()
  userDetails: UserDetails;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
