import ClayButton from '@clayui/button';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import Profile, { ProfileWrapper } from '@/components/profile';
import SkillContext from '@/components/skill-management/SkillContext';
import SkillManagement from '@/components/skill-management/SkillManagement';
import WelcomeContent from '@/components/welcome/WelcomeContent';
import useLang from '@/hooks/useLang';
import { Me, SelectedSkills } from '@/types';
import ROUTES from '@/utils/routes';

import Meta from '../meta';

const userSkillsPaths = [
  {
    name: 'profile',
    path: '/profile',
    symbol: 'user',
  },
  {
    name: 'office-details',
    path: '/profile/office-details',
    symbol: 'document',
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
  me: Me;
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
  children,
  me,
  title,
}) => {
  const i18n = useLang();

  return (
    <Profile>
      <Meta title={i18n.sub('app-title-x', title)} />
      <ProfileWrapper steps={userSkillsPaths} me={me}>
        <h1 className="mb-4">{title}</h1>
        {children}
      </ProfileWrapper>
    </Profile>
  );
};

export { SkillDetails, UserSkillTemplate };
