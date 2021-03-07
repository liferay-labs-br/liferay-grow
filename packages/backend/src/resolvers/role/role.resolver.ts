import { Resolver } from 'type-graphql';

import { Role } from '../../entity/Role';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver('Role', Role, Inputs, [], []);

@Resolver(Role)
export class RoleResolver extends BaseResolver {}
