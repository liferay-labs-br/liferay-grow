import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, BaseEntity, Index } from 'typeorm';

/**
 * @ObjectType - Define an ObjectType to be recognized by GraphQL
 * @Entity - Necessary to integrate with TypeORM as a Column
 * in the Database
 */

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class Office extends BaseEntity {
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
  address: string;

  @Field()
  @Column()
  country: string;
}
