import { Field, InputType } from 'type-graphql';

import { KnowledgeGapsDetailBaseInput } from '../knowledge_gaps_detail/Inputs';
import { KnowledgeSkillDetailBaseInput } from '../knowledge_skill_detail/Inputs';
import { UserDetailBaseInput } from '../user_details/Inputs';

@InputType()
export class GrowMapBaseInput {
  @Field(() => [KnowledgeGapsDetailBaseInput], {
    defaultValue: [],
  })
  knowledgeGapsDetails: KnowledgeGapsDetailBaseInput[];

  @Field(() => [KnowledgeSkillDetailBaseInput], { defaultValue: [] })
  knowledgeSkillDetails: KnowledgeSkillDetailBaseInput[];

  @Field()
  userDetails: UserDetailBaseInput;
}

@InputType()
export class GrowMapSkillDetailsInput {
  @Field(() => [KnowledgeSkillDetailBaseInput], { defaultValue: [] })
  knowledgeSkillDetails: KnowledgeSkillDetailBaseInput[];
}

@InputType()
export class GrowMapSkillGapsInput {
  @Field(() => [KnowledgeGapsDetailBaseInput], {
    defaultValue: [],
  })
  knowledgeGapsDetails: KnowledgeGapsDetailBaseInput[];
}
