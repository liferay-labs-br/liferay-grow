import { Resolver } from 'type-graphql';

import { KnowledgeArea } from '../../entity/KnowledgeArea';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateKnowledgeAreaInput,
  FilterKnowledgeAreaInput,
  UpdateKnowledgeAreaInput,
} from './Inputs';

const Inputs = {
  create: CreateKnowledgeAreaInput,
  filter: FilterKnowledgeAreaInput,
  update: UpdateKnowledgeAreaInput,
};

const BaseResolver = createBaseResolver(
  'KnowledgeArea',
  KnowledgeArea,
  KnowledgeArea,
  Inputs,
  ['skills'],
);

@Resolver(KnowledgeArea)
export class KnowledgeAreaResolver extends BaseResolver {}
