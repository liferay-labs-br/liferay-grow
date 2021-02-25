import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { Career } from './Career';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class CareerDepartament extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field(() => [Career], { nullable: true })
  @OneToMany(() => Career, (career) => career.carreerDepartament, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  careers: Career[];
}
