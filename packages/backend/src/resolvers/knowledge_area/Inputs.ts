import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeAreaBaseInput {
  @Field()
  name: string;

  @Field()
  description: string;
}

@InputType()
class CreateKnowledgeAreaInput extends KnowledgeAreaBaseInput {}

@InputType()
class UpdateKnowledgeAreaInput extends KnowledgeAreaBaseInput {}

@InputType()
class FilterKnowledgeAreaInput extends KnowledgeAreaBaseInput {}

export default {
  create: CreateKnowledgeAreaInput,
  filter: FilterKnowledgeAreaInput,
  update: UpdateKnowledgeAreaInput,
};
