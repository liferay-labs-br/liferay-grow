import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';

import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class Office extends MainEntity {
  @Index({ unique: true })
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  country: string;
}
