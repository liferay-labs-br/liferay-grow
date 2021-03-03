import { Resolver } from 'type-graphql';

import { Career } from '../../entity/Career';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver('Career', Career, Inputs, [
  'carreerDepartament',
]);

@Resolver(Career)
export class CareerResolver extends BaseResolver {}
