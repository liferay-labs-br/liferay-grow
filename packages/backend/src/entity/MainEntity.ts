import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class MainEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
