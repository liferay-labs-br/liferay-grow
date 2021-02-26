import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne, OneToOne } from 'typeorm';

import { Github } from './Github';
import { MainEntity } from './MainEntity';
import { Team } from './Team';

@ObjectType()
@Entity()
export class User extends MainEntity {
  @Field(() => Github)
  @OneToOne(() => Github, (github) => github.user)
  github: Github;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (team) => team.users)
  team: Team;
}
