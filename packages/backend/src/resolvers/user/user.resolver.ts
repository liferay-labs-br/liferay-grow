import request from 'request-promise';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { Github } from '../../entity/Github';
import { User } from '../../entity/User';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

@Resolver(User)
export class UserResolver {
  @Mutation(() => Boolean, { name: 'authGithub' })
  async authGithub (@Arg('code') code: string): Promise<boolean> {
    const baseURL = 'https://github.com/login/oauth/access_token';
    const url = `${baseURL}?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`;

    const response = await request.post(url.toString());

    console.log({ response });

    if (response.includes('access_token=')) {
      const token = response.split('=')[1].split('&').shift();
      const githubUser = await request.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          'User-Agent': 'Planner App - DEV'
        },
        json: true
      });

      const { avatar_url, bio, company, email, id, location, login, name } = githubUser;

      const user = await User.findOne({
        where: {
          login: githubUser.login
        }
      });

      if (!user) {
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

        await newUser.save();
      }

      console.log(githubUser);

      return true;
    }

    throw new Error('Something went wrong');
  }
}
