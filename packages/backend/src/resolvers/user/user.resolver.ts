import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { Profile } from '../../entity/Profile';
import { User } from '../../entity/User';
import { MyContext } from '../../interfaces';

const relations = [
  'profile',
  'growMap',
  'growMap.knowledgeGapsDetails',
  'growMap.knowledgeGapsDetails.knowledgeSkill',
  'growMap.knowledgeSkillDetails',
  'growMap.knowledgeSkillDetails.knowledgeSkill',
  'growMap.knowledgeSkillDetails.knowledgeMatriz',
  'growMap.userDetails',
  'growMap.userDetails.department',
  'growMap.userDetails.office',
  'growMap.userDetails.role',
  'growMap.userDetails.teams',
];

@Resolver(User)
export class UserResolver {
  @Authorized('ADMIN')
  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    const users = await User.find({
      relations,
    });

    return users;
  }

  @Authorized()
  @Query(() => User, { name: 'getUserByLogin' })
  async getUserByLogin(@Arg('login') login: string): Promise<User | Error> {
    try {
      const profile = await Profile.findOneOrFail({
        relations: ['user'],
        where: { github_login: login },
      });

      return User.findOneOrFail(profile.user.id, { relations });
    } catch (e) {
      throw new Error('Account not exists');
    }
  }

  @Authorized()
  @Query(() => User, { name: 'me' })
  async getMe(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const { id } = ctx.loggedUser?.user || {};

    return User.findOneOrFail(id, { relations });
  }
}
