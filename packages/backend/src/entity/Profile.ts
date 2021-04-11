import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

import { MainEntity } from './MainEntity';
import { User } from './User';

@ObjectType()
@Entity()
export class Profile extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  github_id: number;

  @Field()
  @Column()
  @Index({ unique: true })
  github_login: string;

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
  location: string;

  @Field(() => User)
  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn()
  user: User;
}
