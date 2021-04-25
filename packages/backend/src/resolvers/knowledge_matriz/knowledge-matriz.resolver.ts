import { Resolver } from 'type-graphql';

import { KnowledgeMatriz } from '../../entity/KnowledgeMatriz';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver(
  'KnowledgeMatriz',
  KnowledgeMatriz,
  Inputs,
  [],
);

@Resolver(KnowledgeMatriz)
export class KnowledgeMatrizResolver extends BaseResolver {}
