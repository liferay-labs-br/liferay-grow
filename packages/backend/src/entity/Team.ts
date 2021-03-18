import { Arg, Field, ObjectType } from 'type-graphql';
import { Column, Entity, getManager, In, Index, ManyToOne } from 'typeorm';

import {
  UserPaginationInput,
  UserPaginationObject,
} from '../resolvers/user/Inputs';
import { paginate } from '../utils/globalMethods';
import { GrowMap } from './GrowMap';
import { MainEntity } from './MainEntity';
import { Office } from './Office';
import { User } from './User';

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class Team extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field(() => Office, { nullable: true })
  @ManyToOne(() => Office, (office) => office.teams, {
    cascade: ['insert', 'update'],
  })
  office: Office;

  @Field(() => UserPaginationObject, { nullable: true })
  async members(
    @Arg('data', { nullable: true }) data?: UserPaginationInput,
  ): Promise<UserPaginationObject | null> {
    const manager = getManager();

    const userDetailsTeams = await manager
      .createQueryBuilder('user_details_teams', 'udt')
      .where('udt.teamId = :teamId', { teamId: this.id })
      .execute();

    const [userDetailTeam] = userDetailsTeams;

    if (!userDetailTeam) {
      return null;
    }

    const { udt_userDetailsId } = userDetailTeam;

    const growMap = await GrowMap.find({
      relations: ['user'],
      where: { userDetails: udt_userDetailsId },
    });

    const where = { id: In(growMap.map(({ user }) => user.id)) };

    const { pageIndex = 1, pageSize = 20 } = data || {};

    const [, totalCount] = await User.findAndCount({
      where,
    });

    const pagination = paginate(totalCount, pageIndex, pageSize);

    const rows = await User.find({
      relations: ['github'],
      skip: pagination.startIndex,
      take: pagination.pageSize,
      where,
    });

    return {
      pagination,
      rows,
    };
  }
}
