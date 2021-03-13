import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, getManager, Index, ManyToOne } from 'typeorm';

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

  @Field(() => [User])
  async members(): Promise<User[]> {
    const manager = getManager();
    const relations = ['user', 'user.github'];

    const userDetailsTeams = await manager
      .createQueryBuilder('user_details_teams', 'udt')
      .where('udt.teamId = :teamId', { teamId: this.id })
      .execute();

    const [userDetailTeam] = userDetailsTeams;

    if (!userDetailTeam) {
      return [];
    }

    const { udt_userDetailsId } = userDetailTeam;

    const growMap = await GrowMap.find({
      relations: relations,
      where: { userDetails: udt_userDetailsId },
    });

    const users = growMap.map(({ user }) => user);

    return users;
  }
}
