import { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React from 'react';

import TeamTemplate from '@/components/templates/TeamTemplate';
import useLang from '@/hooks/useLang';

const Team: React.FC = () => {
  const i18n = useLang();

  return (
    <TeamTemplate>
      <h1 className="mb-4">Knowledge Areas</h1>
      <ClayInput.Group>
        <ClayInput.GroupItem>
          <ClayInput
            aria-label="Search"
            className="form-control input-group-inset input-group-inset-after"
            placeholder={i18n.get('search-skills')}
            type="text"
          />
          <ClayInput.GroupInsetItem after tag="span">
            <ClayButtonWithIcon
              displayType="unstyled"
              symbol={'search'}
              type="button"
            />
          </ClayInput.GroupInsetItem>
        </ClayInput.GroupItem>
      </ClayInput.Group>
    </TeamTemplate>
  );
};

export default Team;
