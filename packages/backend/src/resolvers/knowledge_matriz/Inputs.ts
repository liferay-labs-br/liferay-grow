import { Field, InputType } from 'type-graphql';

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
