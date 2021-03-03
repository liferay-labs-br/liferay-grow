import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { KnowledgeArea } from './KnowledgeArea';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class KnowledgeSkill extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  created_by: string;

  @Field(() => KnowledgeArea, { nullable: true })
  @ManyToOne(() => KnowledgeArea, (area) => area.skills)
  area: KnowledgeArea;
}
