import { Arg, Query, Resolver } from 'type-graphql';

import { Team } from '../../entity/Team';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const relations = ['office'];

const BaseResolver = createBaseResolver('Team', Team, Inputs, relations, []);

@Resolver(Team)
export class TeamResolver extends BaseResolver {
  @Query(() => Team)
  async getTeamBySlug(@Arg('slug') slug: string): Promise<Team> {
    const team = await Team.findOneOrFail({
      relations,
      where: { slug },
    });

    return team;
  }
}
