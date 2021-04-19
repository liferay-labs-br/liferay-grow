import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { Department } from './Department';
import { MainEntity } from './MainEntity';
import { Office } from './Office';
import { Role } from './Role';
import { Team } from './Team';

@ObjectType()
@Entity()
export class UserDetails extends MainEntity {
  @JoinColumn()
  @Field(() => Department, { nullable: true })
  @OneToOne(() => Department, { createForeignKeyConstraints: false })
  department?: Department;

  @JoinColumn()
  @Field(() => Office, { nullable: true })
  @OneToOne(() => Office, { createForeignKeyConstraints: false })
  office?: Office;

  @JoinColumn()
  @Field(() => Role, { nullable: true })
  @OneToOne(() => Role, { createForeignKeyConstraints: false })
  role?: Role;

  @Field(() => [Team], { nullable: true })
  @JoinTable({ name: 'user_details_teams' })
  @ManyToMany(() => Team)
  teams?: Team[];
}
