import { Resolver } from 'type-graphql';

import { Career } from '../../entity/Career';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateCareerInput,
  FilterCareerInput,
  UpdateCareerInput,
} from './Inputs';

const Inputs = {
  create: CreateCareerInput,
  filter: FilterCareerInput,
  update: UpdateCareerInput,
};

const BaseResolver = createBaseResolver('Career', Career, Career, Inputs, [
  'carreerDepartament',
]);

@Resolver(Career)
export class CareerResolver extends BaseResolver {}
