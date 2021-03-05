import { Field, InputType } from 'type-graphql';

import { KnowledgeSkillDetailBaseInput } from '../knowledge_skill_detail/Inputs';

@InputType()
export class GrowMapBaseInput {
  @Field(() => [KnowledgeSkillDetailBaseInput])
  knowledgeSkillDetails: KnowledgeSkillDetailBaseInput[];
}
