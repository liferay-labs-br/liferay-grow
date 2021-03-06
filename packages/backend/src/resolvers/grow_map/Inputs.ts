import { Field, InputType } from 'type-graphql';

import { KnowledgeGapsDetailBaseInput } from '../knowledge_gaps_detail/Inputs';
import { KnowledgeSkillDetailBaseInput } from '../knowledge_skill_detail/Inputs';

@InputType()
export class GrowMapBaseInput {
  @Field(() => [KnowledgeSkillDetailBaseInput], { defaultValue: [] })
  knowledgeSkillDetails: KnowledgeSkillDetailBaseInput[];

  @Field(() => [KnowledgeGapsDetailBaseInput], {
    defaultValue: [],
  })
  knowledgeGapsDetails: KnowledgeGapsDetailBaseInput[];
}
