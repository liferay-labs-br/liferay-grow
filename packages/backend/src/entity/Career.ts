import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { CareerDepartament } from './CareerDepartament';
import { MainEntity } from './MainEntity';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class Career extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field(() => CareerDepartament, { nullable: true })
  @ManyToOne(
    () => CareerDepartament,
    (carreerDepartament) => carreerDepartament.careers,
    {
      cascade: ['insert', 'update'],
    },
  )
  carreerDepartament: CareerDepartament;
}
