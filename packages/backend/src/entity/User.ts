import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { Github } from './Github';
import { GrowMap } from './GrowMap';
import { MainEntity } from './MainEntity';
import { Team } from './Team';

@ObjectType()
@Entity()
export class User extends MainEntity {
  @Field(() => Github)
  @OneToOne(() => Github, (github) => github.user)
  github: Github;

  @Field(() => GrowMap, { nullable: true })
  @OneToOne(() => GrowMap, (growMap) => growMap.user)
  growMap: GrowMap;

  @Field(() => [Team], { nullable: true })
  @JoinTable()
  @ManyToMany(() => Team)
  team: Team[];
}
