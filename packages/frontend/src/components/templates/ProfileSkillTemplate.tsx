import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import Profile, { ProfileWrapper } from '@/components/profile';
import SkillContext from '@/components/skill-management/SkillContext';
import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import SkillManagement from '@/components/skill-management/SkillManagement';
import WelcomeContent from '@/components/welcome/WelcomeContent';
import useLang from '@/hooks/useLang';
import {
  Me,
  SelectedSkills,
  SkillManagement as ISkillManagement,
} from '@/types';
import ROUTES from '@/utils/routes';

const userSkillsPaths = [
  {
    name: 'Profile',
    path: '/profile',
    symbol: 'user',
  },
  {
    name: 'skills-details',
    path: '/profile/skill-details',
    symbol: 'books',
  },
  {
    name: 'knowledge-gaps',
    path: '/profile/knowledge-gaps',
    symbol: 'books',
  },
];

type ITemplateProps = {
  defaultState: ISkillManagement;
  me: Me;
  onSave: (skill: SelectedSkills[]) => void;
  title: string;
};

type SkillDetailsProps = {
  onSave: (skill: SelectedSkills[]) => void;
};

const SkillDetails: React.FC<SkillDetailsProps> = ({ onSave }) => {
  const {
    state: { selectedSkills },
  } = useContext(SkillContext);

  const i18n = useLang();
  const router = useRouter();

  const onCancel = () => {
    router.push(ROUTES.PROFILE);
  };

  return (
    <>
      <WelcomeContent.Body>
        <SkillManagement />
      </WelcomeContent.Body>
      <WelcomeContent.Footer>
        <ClayButton displayType="secondary" className="mr-2" onClick={onCancel}>
          {i18n.get('cancel')}
        </ClayButton>

        <ClayButton
          disabled={!selectedSkills.length}
          onClick={() => onSave(selectedSkills)}
        >
          {i18n.get('save')}
        </ClayButton>
      </WelcomeContent.Footer>
    </>
  );
};

const UserSkillTemplate: React.FC<ITemplateProps> = ({
  defaultState,
  me,
  onSave,
  title,
}) => {
  return (
    <Profile>
      <ProfileWrapper steps={userSkillsPaths} me={me}>
        <h1 className="mb-4">{title}</h1>
        <SkillContextProvider defaultState={defaultState}>
          <SkillDetails onSave={onSave} />
        </SkillContextProvider>
      </ProfileWrapper>
    </Profile>
  );
};

export { SkillDetails, UserSkillTemplate };
