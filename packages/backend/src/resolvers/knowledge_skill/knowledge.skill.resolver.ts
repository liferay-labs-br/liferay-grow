import { Resolver } from 'type-graphql';

import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateKnowledgeSkillInput,
  FilterKnowledgeSkillInput,
  UpdateKnowledgeSkillInput,
} from './Inputs';

const Inputs = {
  create: CreateKnowledgeSkillInput,
  filter: FilterKnowledgeSkillInput,
  update: UpdateKnowledgeSkillInput,
};

const BaseResolver = createBaseResolver(
  'KnowledgeSkill',
  KnowledgeSkill,
  KnowledgeSkill,
  Inputs,
  ['area'],
);

@Resolver(KnowledgeSkill)
export class KnowledgeSkillResolver extends BaseResolver {}
