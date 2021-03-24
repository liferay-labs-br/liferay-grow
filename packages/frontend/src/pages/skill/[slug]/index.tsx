import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Header from '@/components/header';
import Meta from '@/components/meta';
import Panel from '@/components/panel';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { knowledgeSkillBySlug } from '@/graphql/queries';
import useLang from '@/hooks/useLang';
import ROUTES from '@/utils/routes';

const SkillDetail = ({ area, name, userSkills }) => {
  const i18n = useLang();

  return (
    <>
      <Meta title={`${i18n.get('knowledge-detail')} - ${i18n.get(name)}`} />

      <Header centralized>
        <Header.Title>{name}</Header.Title>
        {/** TODO: Implement total members */}
        <Header.Info>{i18n.sub('x-members', '0')}</Header.Info>
        <Header.Info>{area.name}</Header.Info>
      </Header>

      <ClayLayout.ContainerFluid size="lg">
        <ClayLayout.Row className="mt-4">
          <ClayLayout.Col size={12}>
            <ClayCard className="p-4">
              <Panel displayType="unstyled" title={i18n.get('mentors')}>
                {!!userSkills.length &&
                  userSkills.map(({ github }) => (
                    <ClayLayout.Col key={github.id} size={3}>
                      <ClayCard>
                        <img
                          width="100%"
                          height="100%"
                          src={github.avatar_url}
                          alt={github.name}
                        />
                        <ClayCard.Body>
                          <ClayCard.Row>
                            <div className="autofit-col autofit-col-expand">
                              <section className="autofit-section">
                                <ClayCard.Description displayType="title">
                                  <Link
                                    href={`${ROUTES.PROFILE}/${github.login}`}
                                  >
                                    {github.name}
                                  </Link>
                                </ClayCard.Description>
                                <ClayCard.Description displayType="subtitle">
                                  {area.name}
                                </ClayCard.Description>
                              </section>
                            </div>
                          </ClayCard.Row>
                        </ClayCard.Body>
                      </ClayCard>
                    </ClayLayout.Col>
                  ))}
              </Panel>
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
