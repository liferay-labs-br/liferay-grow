import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Github } from './Github';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Field()
  @Column()
  @Index({ unique: true })
  accountId: number;

  @Field()
  @Column()
  @Index({ unique: true })
  login: string;

  @JoinColumn()
  github: Github;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
