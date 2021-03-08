import { Resolver } from 'type-graphql';

import { KnowledgeArea } from '../../entity/KnowledgeArea';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver(
  'KnowledgeArea',
  KnowledgeArea,
  Inputs,
  ['skills'],
  [],
);

@Resolver(KnowledgeArea)
export class KnowledgeAreaResolver extends BaseResolver {}
