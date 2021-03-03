import { Resolver } from 'type-graphql';

import { CareerDepartament } from '../../entity/CareerDepartament';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver(
  'CareerDepartament',
  CareerDepartament,
  Inputs,
  ['careers'],
);

@Resolver(CareerDepartament)
export class CareerDepartamentResolver extends BaseResolver {}
