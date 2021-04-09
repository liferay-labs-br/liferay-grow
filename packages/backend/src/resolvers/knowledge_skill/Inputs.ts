import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeSkillBaseInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateKnowledgeSkillInput extends KnowledgeSkillBaseInput {
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

@InputType()
export class UserKnowledgeSkillInput {
  @Field({ nullable: true })
  isMentor?: boolean;

  @Field({ nullable: true })
  matrizId?: string;
}

export default {
  create: CreateKnowledgeSkillInput,
  filter: FilterKnowledgeSkillInput,
  update: UpdateKnowledgeSkillInput,
};
