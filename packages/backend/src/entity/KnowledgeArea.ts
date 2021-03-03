import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { KnowledgeSkill } from './KnowledgeSkill';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class KnowledgeArea extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [KnowledgeSkill], { nullable: true })
  @OneToMany(() => KnowledgeSkill, (skill) => skill.area)
  skills: KnowledgeSkill[];
}
