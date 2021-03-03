import { Field, InputType } from 'type-graphql';

@InputType()
class KnowledgeSkillBaseInput {
  @Field()
  name: string;
}

@InputType()
export class CreateKnowledgeSkillInput extends KnowledgeSkillBaseInput {
  @Field({ nullable: true })
  area?: string;
}

@InputType()
export class UpdateKnowledgeSkillInput extends KnowledgeSkillBaseInput {
  @Field({ nullable: true })
  area?: string;
}

@InputType()
export class FilterKnowledgeSkillInput extends KnowledgeSkillBaseInput {}
