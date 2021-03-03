import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeSkillBaseInput {
  @Field()
  name: string;
}

@InputType()
class CreateKnowledgeSkillInput extends KnowledgeSkillBaseInput {
  @Field({ nullable: true })
  area?: string;
}

@InputType()
class UpdateKnowledgeSkillInput extends KnowledgeSkillBaseInput {
  @Field({ nullable: true })
  area?: string;
}

@InputType()
class FilterKnowledgeSkillInput extends KnowledgeSkillBaseInput {}

export default {
  create: CreateKnowledgeSkillInput,
  filter: FilterKnowledgeSkillInput,
  update: UpdateKnowledgeSkillInput,
};
