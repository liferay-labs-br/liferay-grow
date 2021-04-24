import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Configuration {
  @Field({ nullable: true })
  SERVER_NAME: string;

  @Field({ nullable: true })
  SERVER_VERSION: string;
}
