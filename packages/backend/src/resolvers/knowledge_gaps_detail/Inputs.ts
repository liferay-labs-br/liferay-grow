import { Field, InputType } from 'type-graphql';

@InputType()
export class KnowledgeGapsDetailBaseInput {
  @Field()
  knowledgeSkillId: string;
}
