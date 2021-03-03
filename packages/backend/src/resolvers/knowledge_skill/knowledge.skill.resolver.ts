import { Resolver } from 'type-graphql';

import { KnowledgeSkill } from '../../entity/KnowledgeSkill';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver(
  'KnowledgeSkill',
  KnowledgeSkill,
  Inputs,
  ['area'],
);

@Resolver(KnowledgeSkill)
export class KnowledgeSkillResolver extends BaseResolver {}
