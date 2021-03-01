import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { MainEntity } from './MainEntity';
import { Office } from './Office';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class Team extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field(() => Office, { nullable: true })
  @ManyToOne(() => Office, (office) => office.teams, {
    cascade: ['insert', 'update'],
  })
  office: Office;
}
