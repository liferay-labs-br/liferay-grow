import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

import { Github } from './Github';
import { Team } from './Team';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string

  @Field(() => Github)
  @OneToOne(() => Github, (github) => github.user)
  github: Github

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, (team) => team.users)
  team: Team

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date
}
