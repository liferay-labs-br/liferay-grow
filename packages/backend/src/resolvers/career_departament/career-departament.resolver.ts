import { Resolver } from 'type-graphql';

import { CareerDepartament } from '../../entity/CareerDepartament';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateCareerDepartamentInput,
  FilterCareerDepartamentInput,
  UpdateCareerDepartamentInput,
} from './Inputs';

const Inputs = {
  create: CreateCareerDepartamentInput,
  filter: FilterCareerDepartamentInput,
  update: UpdateCareerDepartamentInput,
};

const BaseResolver = createBaseResolver(
  'CareerDepartament',
  CareerDepartament,
  CareerDepartament,
  Inputs,
  ['careers'],
);

@Resolver(CareerDepartament)
export class CareerDepartamentResolver extends BaseResolver {}
