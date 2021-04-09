import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { Github } from '../../entity/Github';
import { User } from '../../entity/User';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';

const relations = [
  'github',
  'growMap',
  'growMap.knowledgeGapsDetails',
  'growMap.knowledgeGapsDetails.knowledgeSkill',
  'growMap.knowledgeSkillDetails',
  'growMap.knowledgeSkillDetails.knowledgeSkill',
  'growMap.knowledgeSkillDetails.knowledgeMatriz',
  'growMap.userDetails',
  'growMap.userDetails.office',
  'growMap.userDetails.role',
  'growMap.userDetails.teams',
];

@Resolver(User)
export class UserResolver {
  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    const users = await User.find({
      relations,
    });

    return users;
  }

  @Query(() => User, { name: 'getUserByLogin' })
  async getUserByLogin(@Arg('login') login: string): Promise<User | Error> {
    try {
      const githubs = await Github.findOneOrFail({
        relations: ['user'],
        where: { login },
      });

      return User.findOneOrFail(githubs.user.id, { relations });
    } catch (e) {
      throw new Error('Account not exists');
    }
  }

  @Query(() => User, { name: 'me' })
  @UseMiddleware(isAuth)
  async getMe(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const {
      req: { headers },
    } = ctx;
    const { loggedUser }: any = headers;

    const { id } = loggedUser?.user;

    return User.findOneOrFail(id, { relations });
  }
}
