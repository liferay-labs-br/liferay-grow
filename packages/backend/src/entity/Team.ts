import { Arg, Field, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  In,
  Index,
  ManyToOne,
} from 'typeorm';

import { KnowledgeMatrizAverage } from '../resolvers/team/Inputs';
import { getUserDetailsIdsByTeam } from '../resolvers/team/team.utils';
import {
  UserPaginationInput,
  UserPaginationObject,
} from '../resolvers/user/Inputs';
import { getAllPagination } from '../utils/baseResolverFN';
import { slugify } from '../utils/globalMethods';
import { getKnowledgeMatrizAverage } from '../utils/queries';
import { GrowMap } from './GrowMap';
import { KnowledgeArea } from './KnowledgeArea';
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

  @BeforeInsert()
  addSlug(): void {
    this.slug = slugify(this.name);
  }

  @BeforeUpdate()
  updateSlug(): void {
    this.slug = slugify(this.name);
  }

  @Field(() => UserPaginationObject, { nullable: true })
  async members(
    @Arg('data', { nullable: true }) data?: UserPaginationInput,
  ): Promise<UserPaginationObject | null> {
    const userDetailsIds = await getUserDetailsIdsByTeam(this.id);

    if (userDetailsIds === null) {
      return null;
    }

    const growMap = await GrowMap.find({
      relations: ['user'],
      where: { userDetails: In(userDetailsIds) },
    });

    const { pagination, rows } = await getAllPagination(
      User,
      { ...data, id: In(growMap.map(({ user }) => user.id)) },
      ['github', 'growMap', 'growMap.userDetails', 'growMap.userDetails.role'],
    );

    return {
      pagination,
      rows,
    };
  }

  @Field(() => [KnowledgeMatrizAverage])
  async knowledgeMatrizAverage(): Promise<KnowledgeMatrizAverage[]> {
    const knowledgeMatrizAverage = getKnowledgeMatrizAverage({
      teamId: this.id,
    });

    return knowledgeMatrizAverage;
  }

  @Field(() => [KnowledgeArea])
  async knowledgeArea(): Promise<KnowledgeArea[]> {
    const userDetailsIds = await getUserDetailsIdsByTeam(this.id);

    if (userDetailsIds === null) {
      return [];
    }

    const growMap = await GrowMap.find({
      relations: [
        'user',
        'knowledgeSkillDetails',
        'knowledgeSkillDetails.knowledgeSkill',
        'knowledgeSkillDetails.knowledgeSkill.area',
      ],
      where: { userDetails: In(userDetailsIds) },
    });

    const areas: any = {};

    for (const grow of growMap) {
      for (const skillDetails of grow.knowledgeSkillDetails) {
        const { area, ...skill } = skillDetails.knowledgeSkill;
        if (!areas[area.id]) {
          areas[area.id] = area;
        }

        if (areas[area.id].skills) {
          const skillSetted = areas[area.id].skills.find(
            ({ id }: any) => id === skill.id,
          );

          if (!skillSetted) {
            areas[area.id].skills.push(skill);
          }
        } else {
          areas[area.id].skills = [skill];
        }
      }
    }

    const knowledgeAreas = [];

    for (const area in areas) {
      knowledgeAreas.push(areas[area]);
    }

    return knowledgeAreas;
  }
}
