import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-toastify';

import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import {
  SkillDetails,
  UserSkillTemplate,
} from '@/components/templates/ProfileSkillTemplate';
import WrappedSafeComponent from '@/components/WrappedSafeComponent';
import { UpdateGrowMapGapsDetails } from '@/graphql/mutations';
import { getMe } from '@/graphql/queries';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { SelectedSkills, User } from '@/types';

type RequestProps = {
  me: User;
};

const ProfileKnowledgeGaps = () => {
  const i18n = useLang();

  const [onUpdateGrowMapGaps] = useMutation(UpdateGrowMapGapsDetails);

  const onSave = async (selectedSkills: SelectedSkills[], refetch) => {
    const knowledgeGapsDetails = selectedSkills.map(({ knowledgeSkillId }) => ({
      knowledgeSkillId,
    }));

    try {
      await onUpdateGrowMapGaps({
        variables: {
          data: {
            knowledgeGapsDetails,
          },
        },
      });

      refetch();
      toast.info(i18n.get('your-request-completed-successfully'));
    } catch (error) {
      toast.error(i18n.get('an-unexpected-error-occurred'));
    }
  };

  return (
    <WrappedSafeComponent<RequestProps> query={getMe}>
      {({ data: { me }, refetch }) => {
        const knowledgeGapsDetails = me.growMap?.knowledgeGapsDetails || [];
        const knowledgeSkillDetails = me.growMap?.knowledgeSkillDetails || [];

        const selectedSkills: SelectedSkills[] = knowledgeGapsDetails.map(
          ({ id, knowledgeSkill }) => ({
            id,
            knowledgeSkillId: knowledgeSkill.id,
          }),
        );

        const knowledgeSkills: SelectedSkills[] = knowledgeSkillDetails.map(
          ({ knowledgeSkill }) => ({
            knowledgeSkillId: knowledgeSkill.id,
          }),
        );

        return (
          <UserSkillTemplate me={me} title={i18n.get('knowledge-gaps')}>
            <SkillContextProvider
              defaultState={{
                knowledgeMatrizLevelAllowed: false,
                selectedSkills,
                unavailableKnowledgeSkills: knowledgeSkills,
              }}
            >
              <SkillDetails onSave={(skills) => onSave(skills, refetch)} />
            </SkillContextProvider>
          </UserSkillTemplate>
        );
      }}
    </WrappedSafeComponent>
  );
};

export default withAuth(ProfileKnowledgeGaps);
