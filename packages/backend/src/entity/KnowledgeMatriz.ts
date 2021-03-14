import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';

import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { matrizLevel: 'ASC' } })
export class KnowledgeMatriz extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  matrizLevel: number;
}
