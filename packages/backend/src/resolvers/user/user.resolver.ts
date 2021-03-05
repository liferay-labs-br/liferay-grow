import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { User } from '../../entity/User';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';

@Resolver(User)
export class UserResolver {
  @Query(() => [User], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    const users = await User.find({
      relations: [
        'github',
        'growMap',
        'growMap.knowledgeSkillDetails',
        'growMap.knowledgeSkillDetails.knowledgeSkill',
        'growMap.knowledgeSkillDetails.knowledgeMatriz',
        'team',
        'team.office',
      ],
    });

    return users;
  }

  @Query(() => User, { name: 'me' })
  @UseMiddleware(isAuth)
  async getMe(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const {
      req: { headers },
    } = ctx;
    const { loggedUser }: any = headers;

    const id = loggedUser?.user;

    const user = await User.findOne({
      relations: ['github', 'team'],
      where: { user: id },
    });

    return user;
  }
}
