import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeAreaBaseInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
export class CreateKnowledgeAreaInput extends KnowledgeAreaBaseInput {}

@InputType()
export class UpdateKnowledgeAreaInput extends KnowledgeAreaBaseInput {}

@InputType()
export class FilterKnowledgeAreaInput extends KnowledgeAreaBaseInput {}
