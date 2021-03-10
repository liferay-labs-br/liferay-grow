import { Resolver } from 'type-graphql';

import { Team } from '../../entity/Team';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver('Team', Team, Inputs, ['office'], []);

@Resolver(Team)
export class TeamResolver extends BaseResolver {}
