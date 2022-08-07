import ClayButton from '@clayui/button';
import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import { useModal } from '@clayui/modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import Meta from '@/components/meta';
import Modal from '@/components/modal';
import Panel from '@/components/panel';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import {
  knowledgeSkillBySlug,
  membersKnowledgeSkillBySlug,
} from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { KnowledgeMatriz, KnowledgeSkill, Profile } from '@/types';
import { COLORS } from '@/utils/constans';
import ROUTES from '@/utils/routes';

type RequestProps = {
  getKnowledgeSkillBySlug: KnowledgeSkill;
};

type Summary = {
  id: string;
  name: string;
  description: string;
  value: number;
};

type SkillDetailMentorsPanelProps = {
  mentoringMembers: {
    growMap?: {
      userDetails?: {
        role?: {
          name: string;
        };
      };
    };
    profile: Profile;
  }[];
};

const SkillDetailMentorsPanel: React.FC<SkillDetailMentorsPanelProps> = ({
  mentoringMembers,
}) => {
  const i18n = useLang();

  const hasMentors = !!mentoringMembers.length;

  return (
    <Panel
      displayType="unstyled"
      title={i18n.get('mentors')}
      defaultExpanded={hasMentors}
    >
      <>
        {hasMentors ? (
          mentoringMembers.map(({ growMap, profile }) => (
            <ClayLayout.Col key={profile.id} size={3}>
              <ClayCard>
                <img
                  draggable={false}
                  width="100%"
                  height="100%"
                  src={profile.avatar_url}
                  alt={profile.name}
                />
                <ClayCard.Body>
                  <ClayCard.Row>
                    <div className="autofit-col autofit-col-expand">
                      <section className="autofit-section">
                        <ClayCard.Description displayType="title">
                          <Link
                            href={`${ROUTES.PROFILE}/${profile.github_login}`}
                          >
                            {profile.name}
                          </Link>
                        </ClayCard.Description>
                        <ClayCard.Description displayType="subtitle">
                          {growMap?.userDetails?.role?.name}
                        </ClayCard.Description>
                      </section>
                    </div>
                  </ClayCard.Row>
                </ClayCard.Body>
              </ClayCard>
            </ClayLayout.Col>
          ))
        ) : (
          <EmptyState title={i18n.get('there-are-no-mentors-yet')} />
        )}
      </>
    </Panel>
  );
};

type ListMembersProps = {
  onClose: () => void;
  matriz: KnowledgeMatriz;
  slug: string;
};

const ListMembers: React.FC<ListMembersProps> = ({ matriz, onClose, slug }) => {
  const matrizOrGap = matriz.id === 'gap' ? 'userGaps' : 'userSkills';

  const i18n = useLang();
  const router = useRouter();

  return (
    <WrappedSafeComponent<RequestProps>
      query={membersKnowledgeSkillBySlug}
      options={{ variables: { matriz: matriz.id, skill: slug } }}
    >
      {({
        data: {
          getKnowledgeSkillBySlug: { [matrizOrGap]: memberList },
        },
      }) => (
        <>
          <h5>{`${i18n.get('members')} (${memberList.length})`}</h5>

          {memberList.map((member) => (
            <div
              key={member.profile.github_login}
              className="skilldetails__listmembers"
            >
              <div className="skilldetails__listmembers--member">
                <img
                  draggable={false}
                  src={member.profile.avatar_url}
                  alt={member.profile.name}
                />
                <span
                  onClick={() => {
                    onClose(); // We need to close the Modal, to avoid scroll problem

                    router.push(
                      `${ROUTES.PROFILE}/${member.profile.github_login}`,
                    );
                  }}
                >
                  {member.profile.name}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </WrappedSafeComponent>
  );
};

type SkillDetailSummaryProps = {
  slug: string;
  summary: Summary[];
};

const SkillDetailSummay: React.FC<SkillDetailSummaryProps> = ({
  slug,
  summary,
}) => {
  const i18n = useLang();
  const [visible, setVisible] = useState(false);
  const [matriz, setMatriz] = useState<Summary>({} as Summary);

  const { observer, onClose } = useModal({
    onClose: () => setVisible(!visible),
  });

  // Filter Empty Results from Summary

  const summaryData = summary.filter(({ value }) => value);

  const getFromattedTooltip = (value: number) => {
    const valueString = value.toString();

    return i18n.sub(value > 1 ? 'x-members' : 'x-member', valueString);
  };

  const hasSummary = !!summaryData.length;

  return (
    <Panel displayType="unstyled" title={i18n.get('summary')}>
      {hasSummary ? (
        <>
          <PieChart className="summary-chart" width={420} height={280}>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={0}
            >
              {summary.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  onClick={() => console.log(summary)}
                />
              ))}
            </Pie>
            <Tooltip formatter={getFromattedTooltip} />
            <Legend
              align="right"
              iconSize={16}
              formatter={(value) => (
                <ClayButton
                  displayType="unstyled"
                  onClick={() => {
                    setVisible(true);
                    const matriz = summary.find(({ name }) => name === value);
                    setMatriz(matriz);
                  }}
                >
                  <span className="legend-text">{value}</span>
                </ClayButton>
              )}
              iconType="square"
              layout="vertical"
              verticalAlign="middle"
            />
          </PieChart>
          <Modal
            visible={visible}
            observer={observer}
            title={matriz.name}
            subtitle={
              matriz.description
                ? `${i18n.sub('description-x-x', [
                    matriz.name,
                    matriz.description,
                  ])}`
                : null
            }
          >
            <ListMembers onClose={onClose} matriz={matriz} slug={slug} />
          </Modal>
        </>
      ) : (
        <EmptyState title={i18n.get('there-are-no-members-yet')} />
      )}
    </Panel>
  );
};

const SkillDetail = ({
  area,
  description,
  mentoringMembers,
  name,
  otherMembers,
  slug,
  summary,
  userGaps,
}) => {
  const i18n = useLang();
  const totalMembers = otherMembers.length + userGaps.length;

  return (
    <>
      <Meta title={`${i18n.get('knowledge-detail')} - ${i18n.get(name)}`} />
      <Header centralized>
        <Header.Title>{name}</Header.Title>
        <Header.Info>
          <p>{description}</p>
          {i18n.sub(
            totalMembers > 1 ? 'x-members' : 'x-member',
            totalMembers.toString(),
          )}
        </Header.Info>
        <Header.Info>{area.name}</Header.Info>
      </Header>
      <ClayLayout.ContainerFluid size="lg">
        <ClayLayout.Row className="mt-4">
          <ClayLayout.Col size={12}>
            <ClayCard className="p-4">
              <SkillDetailMentorsPanel mentoringMembers={mentoringMembers} />

              <SkillDetailSummay summary={summary} slug={slug} />
            </ClayCard>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayLayout.ContainerFluid>
    </>
  );
};

const SkillDetailWrapper: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    query: { slug },
  } = useRouter();

  if (!slug) {
    return null;
  }

  return (
    <div className="skilldetails">
      <WrappedSafeComponent<RequestProps>
        query={knowledgeSkillBySlug}
        options={{ variables: { slug } }}
      >
        {({ data: { getKnowledgeSkillBySlug } }) => (
          <SkillDetail {...getKnowledgeSkillBySlug} slug={slug} />
        )}
      </WrappedSafeComponent>
    </div>
  );
};

export default withAuth(SkillDetailWrapper);
