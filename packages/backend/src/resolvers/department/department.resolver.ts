import { Resolver } from 'type-graphql';

import { Department } from '../../entity/Department';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver('Department', Department, Inputs);

@Resolver(Department)
export class DepartmentResolver extends BaseResolver {}
