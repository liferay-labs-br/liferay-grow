import axios from 'axios';

const { APP_NAME, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const options = {
  headers: {
    'User-Agent': APP_NAME,
  },
};

export const getGithubUser = async (code: string): Promise<any> => {
  const baseURL = 'https://github.com/login/oauth/access_token';

  const queryString = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID as string,
    client_secret: GITHUB_CLIENT_SECRET as string,
    code,
  }).toString();

  const { data: response } = await axios.post<string>(
    `${baseURL}?${queryString}`,
  );

  if (response.includes('access_token=')) {
    const access_token = response.split('=')[1].split('&').shift();
    const { data: githubUser } = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          ...options.headers,
          Authorization: `token ${access_token}`,
        },
      },
    );

    return githubUser;
  } else {
    throw new Error('Something went wrong');
  }
};

export const belongsToLiferayOrg = async (
  username: string,
): Promise<boolean> => {
  try {
    const { data: organizations } = await axios.get<Array<any>>(
      `https://api.github.com/users/${username}/orgs`,
      options,
    );

    const liferayOrg = organizations.find((org) => org.login === 'liferay');

    return !!liferayOrg;
  } catch (e) {
    return false;
  }
};
