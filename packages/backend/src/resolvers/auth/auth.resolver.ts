import jsonwebtoken from 'jsonwebtoken';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { promisify } from 'util';

import { Profile } from '../../entity/Profile';
import { User } from '../../entity/User';
import { logger } from '../../utils/globalMethods';
import { belongsToLiferayOrg, getGithubUser } from './auth.utils';

const { JWT_SECRET, VALIDATE_LIFERAY_ORG } = process.env;

const assignToken = async (payload: any): Promise<string> => {
  const token = await promisify(jsonwebtoken.sign)(
    { ...payload },
    JWT_SECRET as string,
  );

  return token as string;
};

@Resolver(Profile)
export class AuthResolver {
  @Mutation(() => String, { name: 'authGithub' })
  async authGithub(@Arg('code') code: string): Promise<string> {
    const githubUser = await getGithubUser(code);

    const {
      avatar_url,
      email,
      id: github_id,
      location,
      login: github_login,
      name,
    } = githubUser;

    const profile = await Profile.findOne({
      relations: ['user', 'user.growMap'],
      where: {
        github_login,
      },
    });

    let token = '';

    if (profile) {
      token = await assignToken(profile);
    } else {
      if (VALIDATE_LIFERAY_ORG) {
        const isLiferayMember = await belongsToLiferayOrg(github_login);

        if (!isLiferayMember) {
          logger.error(`${github_login} is not a liferay member`);

          throw new Error('not-a-liferay-member');
        }
      }

      const newUser = await User.create().save();

      const newProfile = await Profile.create({
        avatar_url,
        email,
        github_id,
        github_login,
        location,
        name,
        user: newUser,
      }).save();

      newUser.profile = newProfile;

      token = await assignToken(newProfile);

      await newUser.save();
    }

    logger.info(`Token generated for ${github_login}`);

    return token;
  }
}
