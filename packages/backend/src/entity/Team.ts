import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { MainEntity } from './MainEntity';
import { Office } from './Office';
import { User } from './User';

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

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.team, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  users: User[];
}
