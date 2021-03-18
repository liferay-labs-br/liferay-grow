import { Field, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
} from 'typeorm';

import { slugify } from '../utils/globalMethods';
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
  slug: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdBy: string;

  @Field(() => KnowledgeArea, { nullable: true })
  @ManyToOne(() => KnowledgeArea, (area) => area.skills)
  area: KnowledgeArea;

  @BeforeInsert()
  addSlug(): void {
    this.slug = slugify(this.name);
  }

  @BeforeUpdate()
  updateSlug(): void {
    this.slug = slugify(this.name);
  }
}
