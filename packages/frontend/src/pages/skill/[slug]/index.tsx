import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import EmptyState from '@/components/empty-state';
import Header from '@/components/header';
import Meta from '@/components/meta';
import Panel from '@/components/panel';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { knowledgeSkillBySlug } from '@/graphql/queries';
import useLang from '@/hooks/useLang';
import { Profile } from '@/types';
import { COLORS } from '@/utils/constans';
import ROUTES from '@/utils/routes';

type Summary = {
  name: string;
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
      {hasMentors ? (
        mentoringMembers.map(({ growMap, profile }) => (
          <ClayLayout.Col key={profile.id} size={3}>
            <ClayCard>
              <img
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
    </Panel>
  );
};

interface ISkillDetailSummaryProps extends React.HTMLAttributes<HTMLElement> {
  summary: Summary[];
}

const SkillDetailSummay: React.FC<ISkillDetailSummaryProps> = ({ summary }) => {
  const i18n = useLang();

  // Filter Empty Results from Summary

  const summaryData = summary.filter(({ value }) => value);

  const getFromattedTooltip = (value: number) => {
    const valueString = value.toString();

    return i18n.sub(value > 1 ? 'x-members' : 'x-member', valueString);
  };

  return (
    <Panel displayType="unstyled" title={i18n.get('summary')}>
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
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={getFromattedTooltip} />
        <Legend
          align="right"
          iconSize={16}
          formatter={(value) => <span className="legend-text">{value}</span>}
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
        />
      </PieChart>
    </Panel>
  );
};

const SkillDetail = ({
  area,
  description,
  mentoringMembers,
  name,
  otherMembers,
  summary,
}) => {
  const i18n = useLang();
  const totalMembers = mentoringMembers.length + otherMembers.length;

  return (
    <>
      <Meta title={`${i18n.get('knowledge-detail')} - ${i18n.get(name)}`} />
      <Header centralized>
        <Header.Title>{name}</Header.Title>
        <Header.Info>
          <p>{description}</p>
          {i18n.sub(
            totalMembers > 1 ? 'x-members' : 'x-member',
            String(totalMembers),
          )}
        </Header.Info>
        <Header.Info>{area.name}</Header.Info>
      </Header>
      <ClayLayout.ContainerFluid size="lg">
        <ClayLayout.Row className="mt-4">
          <ClayLayout.Col size={12}>
            <ClayCard className="p-4">
              <SkillDetailMentorsPanel mentoringMembers={mentoringMembers} />

              <SkillDetailSummay summary={summary} />
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
    <WrappedSafeComponent
      query={knowledgeSkillBySlug}
      options={{ variables: { slug } }}
    >
      {({ getKnowledgeSkillBySlug }) => (
        <SkillDetail {...getKnowledgeSkillBySlug} />
      )}
    </WrappedSafeComponent>
  );
};

export default SkillDetailWrapper;
