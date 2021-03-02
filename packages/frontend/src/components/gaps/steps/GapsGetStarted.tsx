import ClayForm, { ClaySelect } from '@clayui/form';
import React, { useContext } from 'react';

import GapsContext from '../GapsContext';

const GapsGetStarted: React.FC<React.HTMLAttributes<HTMLElement>> = () => {
  const {
    state: {
      main: { carrees: careerDepartament, offices },
    },
  } = useContext(GapsContext);

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
          {careerDepartament.map((departament) => (
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
};

export default GapsGetStarted;
