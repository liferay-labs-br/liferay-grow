import ClayForm, { ClaySelect } from '@clayui/form';
import React from 'react';

import WelcomeTmpl from '../../components/welcome/WelcomeTmpl';
import WrappedSafeComponent from '../../components/WrappedSafeComponent';
import { getStarted } from '../../graphql/queries';
import withAuth from '../../hocs/withAuth';

const GetStarted: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  return (
    <WelcomeTmpl>
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
    </WelcomeTmpl>
  );
};

export default withAuth(GetStarted);
