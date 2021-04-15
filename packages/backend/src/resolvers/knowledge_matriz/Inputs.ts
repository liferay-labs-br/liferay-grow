import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class KnowledgeMatrizAverage {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  matrizLevelAvg: string;
}

@ObjectType()
export class KnowledgeSkillSummary {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  value: number;
}

@InputType()
class KnowledgeMatrizBaseInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
class CreateKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}

@InputType()
class UpdateKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}

@InputType()
class FilterKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}

export default {
  create: CreateKnowledgeMatrizInput,
  filter: FilterKnowledgeMatrizInput,
  update: UpdateKnowledgeMatrizInput,
};
