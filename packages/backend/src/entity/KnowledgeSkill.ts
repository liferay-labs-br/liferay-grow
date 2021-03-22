import { Arg, Field, ObjectType } from 'type-graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  getManager,
  Index,
  ManyToOne,
} from 'typeorm';

import { UserKnowledgeSkillInput } from '../resolvers/knowledge_skill/Inputs';
import { slugify } from '../utils/globalMethods';
import { KnowledgeArea } from './KnowledgeArea';
import { MainEntity } from './MainEntity';
import { User } from './User';

const relations = ['github'];

@ObjectType()
@Entity({ orderBy: { name: 'ASC' } })
export class KnowledgeSkill extends MainEntity {
  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdBy: string;

  @Field(() => KnowledgeArea, { nullable: true })
  @ManyToOne(() => KnowledgeArea, (area) => area.skills)
  area: KnowledgeArea;

  @Field(() => [User])
  async userSkills(
    @Arg('data', { nullable: true }) data?: UserKnowledgeSkillInput,
  ): Promise<User[]> {
    const manager = getManager();

    let knowledgeSkillDetailsQuery = manager
      .createQueryBuilder('knowledge_skill_details', 'ksd')
      .innerJoinAndSelect(
        'grow_map_knowledge_skill_details',
        'gmksd',
        'gmksd.knowledgeSkillDetailsId = ksd.id',
      )
      .innerJoinAndSelect('grow_map', 'gm', 'gm.id = gmksd.growMapId')
      .where('ksd.knowledgeSkillId = :id', { id: this.id });

    if (data?.isMentor) {
      knowledgeSkillDetailsQuery = knowledgeSkillDetailsQuery.andWhere(
        'ksd.isMentor = 1',
      );
    }

    if (data?.matrizId) {
      knowledgeSkillDetailsQuery = knowledgeSkillDetailsQuery.andWhere(
        'ksd.knowledgeMatrizId = :knowledgeMatrizId',
        { knowledgeMatrizId: data.matrizId },
      );
    }

    const knowledgeSkillDetails: any[] = await knowledgeSkillDetailsQuery.execute();

    if (!knowledgeSkillDetails.length) {
      return [];
    }

    const membersId = knowledgeSkillDetails.map(({ gm_userId }) => gm_userId);

    const users = await User.findByIds(membersId, { relations });

    return users;
  }

  @Field(() => [User])
  async userGaps(): Promise<User[]> {
    const manager = getManager();

    const knowledgeGapsDetails: any[] = await manager
      .createQueryBuilder('knowledge_gaps_details', 'kgd')
      .innerJoinAndSelect(
        'grow_map_knowledge_gaps_details',
        'gmkgd',
        'gmkgd.knowledgeGapsDetailsId = kgd.id',
      )
      .innerJoinAndSelect('grow_map', 'gm', 'gm.id = gmkgd.growMapId')
      .where('kgd.knowledgeSkill = :id', { id: this.id })
      .execute();

    if (!knowledgeGapsDetails.length) {
      return [];
    }

    const membersId = knowledgeGapsDetails.map(({ gm_userId }) => gm_userId);

    const users = await User.findByIds(membersId, { relations });

    return users;
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
