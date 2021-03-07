import ClayButton from '@clayui/button';
import ClayForm, { ClaySelect } from '@clayui/form';
import { useRouter } from 'next/router';
import React from 'react';

import WelcomeContent from '../../components/welcome/WelcomeContent';
import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getStarted } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';
import useLang from '../../hooks/useLang';

const GetStartedBody: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();

  return (
    <WrappedSafeComponent query={getStarted}>
      {({ offices, roles }) => {
        return (
          <ClayForm>
            <ClayForm.Group>
              <label htmlFor="team">{i18n.get('team')}</label>
              <ClaySelect>
                {offices.map((office) => (
                  <optgroup key={office.id} label={office.name}>
                    {office.teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </ClaySelect>
            </ClayForm.Group>
            <ClayForm.Group>
              <label htmlFor="role">{i18n.get('role')}</label>
              <ClaySelect>
                {roles.map((roles) => (
                  <option key={roles.id} value={roles.id}>
                    {roles.name}
                  </option>
                ))}
              </ClaySelect>
            </ClayForm.Group>
          </ClayForm>
        );
      }}
    </WrappedSafeComponent>
  );
};

const GetStarted: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const i18n = useLang();
  const router = useRouter();

  return (
    <WelcomeTmpl>
      <WelcomeContent>
        <WelcomeContent.Title>{i18n.get('get-started')}</WelcomeContent.Title>
        <WelcomeContent.Body>
          <GetStartedBody />
        </WelcomeContent.Body>
        <WelcomeContent.Footer>
          <ClayButton onClick={() => router.push('skills-details')}>
            {i18n.get('next')}
          </ClayButton>
        </WelcomeContent.Footer>
      </WelcomeContent>
    </WelcomeTmpl>
  );
};

export default withAuth(GetStarted);
