import jsonwebtoken from 'jsonwebtoken';
import request from 'request-promise';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { promisify } from 'util';

import { Github } from '../../entity/Github';
import { User } from '../../entity/User';
import { MyContext } from '../../interfaces';
import { isAuth } from '../../middlewares/isAuth';
import { logger } from '../../utils/globalMethods'; ;

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET } = process.env;

@Resolver(User)
export class UserResolver {
  async assignToken (payload: any): Promise<string> {
    const token = await promisify(jsonwebtoken.sign)(
      payload,
      JWT_SECRET as string
    );

    return token as string;
  }

  async getGithubUser (code: string): Promise<any> {
    const baseURL = 'https://github.com/login/oauth/access_token';
    const url = `${baseURL}?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`;

    const response = await request.post(url.toString());

    if (response.includes('access_token=')) {
      const access_token = response.split('=')[1].split('&').shift();
      const githubUser = await request.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${access_token}`,
          'User-Agent': 'Planner App - DEV'
        },
        json: true
      });

      return githubUser;
    } else {
      throw new Error('Something went wrong');
    }
  }

  @Mutation(() => String, { name: 'authGithub' })
  async authGithub (@Arg('code') code: string): Promise<string> {
    const githubUser = await this.getGithubUser(code);
    const { avatar_url, bio, company, email, id, location, login, name } = githubUser;

    const user = await Github.findOne({
      relations: ['user'],
      where: {
        login
      }
    });

    let token = '';

    if (user) {
      token = await this.assignToken({ ...user });
    } else {
      const newUser = await User.create({
        accountId: id,
        login
      }).save();

      const newGithub = await Github.create({
        avatar_url,
        bio,
        company,
        email,
        location,
        login,
        name,
        user: newUser
      }).save();

      newUser.github = newGithub;

      token = await this.assignToken({ ...newGithub });

      await newUser.save();
    }

    logger.info(`Token generated for ${login}`);

    return token;
  }

  @Query(() => Github, { name: 'me' })
  @UseMiddleware(isAuth)
  async getMe (@Ctx() ctx: MyContext): Promise<Github | undefined> {
    const { req: { headers } } = ctx;
    const { loggedUser }: any = headers;

    const id = loggedUser?.user;

    const github = await Github.findOne({ where: { user: id } });

    return github;
  }
}
