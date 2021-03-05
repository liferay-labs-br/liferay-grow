import { Resolver } from 'type-graphql';

import { KnowledgeSkillDetails } from '../../entity/KnowledgeSkillDetails';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver(
  'KnowledgeSkillDetails',
  KnowledgeSkillDetails,
  Inputs,
);

@Resolver(KnowledgeSkillDetails)
export class KnowledgeSkillDetailsResolver extends BaseResolver {}
