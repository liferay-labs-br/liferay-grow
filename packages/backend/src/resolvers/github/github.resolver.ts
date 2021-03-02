import jsonwebtoken from 'jsonwebtoken';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { promisify } from 'util';

import { Github } from '../../entity/Github';
import { User } from '../../entity/User';
import { logger } from '../../utils/globalMethods';
import { belongsToLiferayOrg, getGithubUser } from './github.utils';

const { JWT_SECRET } = process.env;

const assignToken = async (payload: any): Promise<string> => {
  const token = await promisify(jsonwebtoken.sign)(
    { ...payload },
    JWT_SECRET as string,
  );

  return token as string;
};

@Resolver(Github)
export class GithubResolver {
  @Query(() => [Github], { name: 'getAllGithubs' })
  async getAllGithubs(): Promise<Github[]> {
    const githubs = await Github.find({ relations: ['user'] });

    return githubs;
  }

  @Mutation(() => String, { name: 'authGithub' })
  async authGithub(@Arg('code') code: string): Promise<string> {
    const githubUser = await getGithubUser(code);
    const {
      avatar_url,
      bio,
      company,
      email,
      id: accountId,
      location,
      login,
      name,
    } = githubUser;

    const user = await Github.findOne({
      relations: ['user'],
      where: {
        login,
      },
    });

    let token = '';

    if (user) {
      token = await assignToken(user);
    } else {
      const isLiferayMember = await belongsToLiferayOrg(login);

      if (!isLiferayMember) {
        throw new Error('not-a-liferay-member');
      }

      const newUser = await User.create().save();
      const newGithub = await Github.create({
        accountId,
        avatar_url,
        bio,
        company,
        email,
        location,
        login,
        name,
        user: newUser,
      }).save();

      newUser.github = newGithub;

      token = await assignToken(newGithub);

      await newUser.save();
    }

    logger.info(`Token generated for ${login}`);

    return token;
  }
}
