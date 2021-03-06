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
  return (
    <WrappedSafeComponent query={getStarted}>
      {({ careerDepartaments, offices }) => {
        return (
          <ClayForm>
            <ClayForm.Group>
              <label htmlFor="office">Office</label>
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
              <label htmlFor="job-title">Job Title</label>
              <ClaySelect>
                {careerDepartaments.map((departament) => (
                  <optgroup key={departament.id} label={departament.name}>
                    {departament.careers.map((career) => (
                      <option key={career.id} value={career.id}>
                        {career.name}
                      </option>
                    ))}
                  </optgroup>
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
