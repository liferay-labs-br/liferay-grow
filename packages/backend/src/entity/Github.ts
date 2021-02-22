import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@ObjectType()
@Entity()
export class Github extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Field()
  @Column()
  @Index({ unique: true })
  accountId: number;

  @Field(() => User)
  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true
  })
  @JoinColumn()
  user: User

  @Field()
  @Column()
  @Index({ unique: true })
  login: string;

  @Field()
  @Column()
  avatar_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  company: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;
}
