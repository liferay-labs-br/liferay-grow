import { Field, ObjectType } from 'type-graphql';
import { Entity, OneToOne } from 'typeorm';

import { GrowMap } from './GrowMap';
import { MainEntity } from './MainEntity';
import { Profile } from './Profile';

@ObjectType()
@Entity()
export class User extends MainEntity {
  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Field(() => GrowMap, { nullable: true })
  @OneToOne(() => GrowMap, (growMap) => growMap.user)
  growMap: GrowMap;
}
