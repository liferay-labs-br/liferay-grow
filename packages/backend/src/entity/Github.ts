import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@ObjectType()
@Entity()
export class Github extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

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

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  company: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  bio: string;
}
