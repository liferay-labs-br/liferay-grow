import { Field, InputType } from 'type-graphql';

@InputType()
export class KnowledgeSkillDetailBaseInput {
  @Field()
  knowledgeSkillId: string;

  @Field()
  knowledgeMatrizId: string;

  @Field()
  isMentor: boolean;
}

@InputType()
class CreateKnowledgeSkillDetailInput extends KnowledgeSkillDetailBaseInput {}

@InputType()
class UpdateKnowledgeSkillDetailInput extends KnowledgeSkillDetailBaseInput {}

@InputType()
class FilterKnowledgeSkillDetailInput extends KnowledgeSkillDetailBaseInput {}

export default {
  create: CreateKnowledgeSkillDetailInput,
  filter: FilterKnowledgeSkillDetailInput,
  update: UpdateKnowledgeSkillDetailInput,
};
