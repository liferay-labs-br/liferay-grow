import jsonwebtoken from 'jsonwebtoken';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { promisify } from 'util';

import { Profile } from '../../entity/Profile';
import { User } from '../../entity/User';
import { logger } from '../../utils/globalMethods';
import { belongsToLiferayOrg, getGithubUser } from './github.utils';

const { JWT_SECRET, VALIDATE_LIFERAY_ORG } = process.env;

const assignToken = async (payload: any): Promise<string> => {
  const token = await promisify(jsonwebtoken.sign)(
    { ...payload },
    JWT_SECRET as string,
  );

  return token as string;
};

@Resolver(Profile)
export class GithubResolver {
  @Query(() => [Profile], { name: 'getAllGithubs' })
  async getAllGithubs(): Promise<Profile[]> {
    const profiles = await Profile.find({ relations: ['user'] });

    return profiles;
  }

  @Mutation(() => String, { name: 'authGithub' })
  async authGithub(@Arg('code') code: string): Promise<string> {
    const githubUser = await getGithubUser(code);
    const {
      avatar_url,
      email,
      id: accountId,
      location,
      login,
      name,
    } = githubUser;

    const user = await Profile.findOne({
      relations: ['user', 'user.growMap'],
      where: {
        github_login: login,
      },
    });

    let token = '';

    if (user) {
      token = await assignToken(user);
    } else {
      if (VALIDATE_LIFERAY_ORG) {
        const isLiferayMember = await belongsToLiferayOrg(login);

        if (!isLiferayMember) {
          throw new Error('not-a-liferay-member');
        }
      }

      const newUser = await User.create().save();
      const newProfile = await Profile.create({
        avatar_url,
        email,
        github_id: accountId,
        github_login: login,
        location,
        name,
        user: newUser,
      }).save();

      newUser.profile = newProfile;

      token = await assignToken(newProfile);

      await newUser.save();
    }

    logger.info(`Token generated for ${login}`);

    return token;
  }
}
