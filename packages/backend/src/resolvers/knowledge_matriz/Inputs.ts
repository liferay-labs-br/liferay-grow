import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeMatrizBaseInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class CreateKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}

@InputType()
export class UpdateKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}

@InputType()
export class FilterKnowledgeMatrizInput extends KnowledgeMatrizBaseInput {}
