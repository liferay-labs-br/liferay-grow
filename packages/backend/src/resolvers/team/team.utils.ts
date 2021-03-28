import { getManager } from 'typeorm';

export const getUserDetailsIdsByTeam = async (
  teamId: string,
): Promise<string[] | null> => {
  const manager = getManager();

  const userDetailsTeams = await manager
    .createQueryBuilder('user_details_teams', 'udt')
    .where('udt.teamId = :teamId', { teamId })
    .execute();

  if (!userDetailsTeams.length) {
    return null;
  }

  const userDetailsIds = userDetailsTeams.map(
    ({ udt_userDetailsId }: any) => udt_userDetailsId,
  );

  return userDetailsIds;
};
