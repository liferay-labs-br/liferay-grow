import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { MainEntity } from './MainEntity';
import { Team } from './Team';

@ObjectType()
@Entity()
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
  country: string;

  @Field(() => [Team], { nullable: true })
  @OneToMany(() => Team, (team) => team.office, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  teams: Team[];
}
