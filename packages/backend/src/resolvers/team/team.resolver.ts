import { Resolver } from 'type-graphql';

import { Team } from '../../entity/Team';
import { createBaseResolver } from '../../utils/createBaseResolver';
import { CreateTeamInput, FilterTeamInput, UpdateTeamInput } from './Inputs';

const Inputs = {
  create: CreateTeamInput,
  filter: FilterTeamInput,
  update: UpdateTeamInput
};

const BaseResolver = createBaseResolver(
  'Team',
  Team,
  Team,
  Inputs,
  ['users', 'users.github', 'office']
);

@Resolver(Team)
export class TeamResolver extends BaseResolver {}
