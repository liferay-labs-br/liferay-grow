import { Arg, Field, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  getManager,
  In,
  Index,
  ManyToOne,
} from 'typeorm';

import {
  UserPaginationInput,
  UserPaginationObject,
} from '../resolvers/user/Inputs';
import { paginate, slugify } from '../utils/globalMethods';
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  slug: string;

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

    if (!userDetailsTeams.length) {
      return null;
    }

    const userDetailsIds = userDetailsTeams.map(
      ({ udt_userDetailsId }: any) => udt_userDetailsId,
    );

    const growMap = await GrowMap.find({
      relations: ['user'],
      where: { userDetails: In(userDetailsIds) },
    });

    const where = { id: In(growMap.map(({ user }) => user.id)) };

    const { pageIndex = 1, pageSize = 20 } = data || {};

    const [, totalCount] = await User.findAndCount({
      where,
    });

    const pagination = paginate(totalCount, pageIndex, pageSize);

    const rows = await User.find({
      relations: [
        'github',
        'growMap',
        'growMap.userDetails',
        'growMap.userDetails.role',
      ],
      skip: pagination.startIndex,
      take: pagination.pageSize,
      where,
    });

    return {
      pagination,
      rows,
    };
  }

  @BeforeInsert()
  addSlug(): void {
    this.slug = slugify(this.name);
  }

  @BeforeUpdate()
  updateSlug(): void {
    this.slug = slugify(this.name);
  }
}
