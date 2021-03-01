import { Resolver } from 'type-graphql';

import { KnowledgeMatriz } from '../../entity/KnowledgeMatriz';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateKnowledgeMatrizInput,
  FilterKnowledgeMatrizInput,
  UpdateKnowledgeMatrizInput,
} from './Inputs';

const Inputs = {
  create: CreateKnowledgeMatrizInput,
  filter: FilterKnowledgeMatrizInput,
  update: UpdateKnowledgeMatrizInput,
};

const BaseResolver = createBaseResolver(
  'KnowledgeMatriz',
  KnowledgeMatriz,
  KnowledgeMatriz,
  Inputs,
);

@Resolver(KnowledgeMatriz)
export class KnowledgeMatrizResolver extends BaseResolver {}
