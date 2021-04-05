import ClayAlert from '@clayui/alert';
import ClayButton from '@clayui/button';
import ClayForm, { ClaySelect } from '@clayui/form';
import { useModal } from '@clayui/modal';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import DropDown from '@/components/drop-down/DropDown';
import DropDownTabs from '@/components/drop-down/DropDownTabs';
import Meta from '@/components/meta';
import Modal from '@/components/modal';
import SkillContext from '@/components/skill-management/SkillContext';
import SkillContextProvider from '@/components/skill-management/SkillContextProvider';
import SkillManagementBars from '@/components/skill-management/SkillManagementBars';
import SkillManagementSearch from '@/components/skill-management/SkillManagementSearch';
import useSkillManagement from '@/components/skill-management/useSkillManagement';
import HomeTemplate from '@/components/templates/HomeTemplate';
import withAuth from '@/hocs/withAuth';
import useLang from '@/hooks/useLang';
import { Skill } from '@/types';
import { flat } from '@/utils/util';

import { baseURL } from '../graphql/nextApollo';

const KnowledgeAreaManagement: React.FC<
  React.HTMLAttributes<HTMLElement>
> = () => {
  const router = useRouter();
  const {
    state: { knowledgeMatriz, knowledgeSkills },
  } = useContext(SkillContext);

  const {
    fns: { handleClickTab, setPageSize },
    state: {
      DEFAULT_PAGE_SIZE,
      filteredSkills,
      pageSize,
      paginatedSkills,
      tabs,
    },
  } = useSkillManagement();

  const knowledgeMatrizAverages = flat(
    knowledgeSkills.map(({ knowledgeMatrizAverage }) => knowledgeMatrizAverage),
  );

  const handleClickSkill = ({ slug }: Skill) => {
    router.push(`/skill/${slug}`);
  };

  return (
    <div className="skill-management">
      <SkillManagementSearch />

      <SkillManagementBars>
        <DropDownTabs tabs={tabs} onClick={handleClickTab} offset={5}>
          <SkillManagementBars.ListAverage
            skills={paginatedSkills}
            knowledgeMatriz={knowledgeMatriz}
            knowledgeMatrizAverage={knowledgeMatrizAverages}
            handleClickSkill={handleClickSkill}
          />
        </DropDownTabs>
        <SkillManagementBars.Results
          filteredSkills={paginatedSkills}
          showAdd={false}
        />
        <SkillManagementBars.Footer
          moreSkills={filteredSkills.length > paginatedSkills.length}
          filteredSkills={paginatedSkills}
          handleMoreSkills={() => setPageSize(pageSize + DEFAULT_PAGE_SIZE)}
        />
      </SkillManagementBars>
    </div>
  );
};

const KnowledgeAreaHeader: React.FC = () => {
  const i18n = useLang();
  const [visible, setVisible] = useState(false);
  const [extension, setExtension] = useState('csv');
  const options = [
    {
      label: 'CSV',
      value: 'csv',
    },
  ];

  const { observer, onClose } = useModal({
    onClose: () => setVisible(!visible),
  });

  const downlaodFile = () => {
    fetch(`${baseURL}/${extension}/export`)
      .then((response) => response.json())
      .then((res) => {
        const url = baseURL + res.path;
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success(i18n.get('your-request-completed-successfully'));
      })
      .catch(() => toast.error(i18n.get('an-unexpected-error-occurred')))
      .finally(() => setVisible(false));
  };

  return (
    <>
      <Meta title={i18n.sub('app-title-x', 'knowledge-areas')} />
      <div className="d-flex">
        <h1 className="flex-grow-1">{i18n.get('knowledge-areas')}</h1>
        <DropDown
          actions={[
            {
              action: () => setVisible(true),
              name: i18n.get('export-as-csv'),
            },
          ]}
        />
      </div>
      <Modal
        visible={visible}
        observer={observer}
        title={i18n.get('export-as-csv')}
        last={
          <>
            <ClayButton
              className="mr-3"
              displayType="secondary"
              onClick={onClose}
            >
              {i18n.get('cancel')}
            </ClayButton>
            <ClayButton displayType="primary" onClick={downlaodFile}>
              {i18n.get('export')}
            </ClayButton>
          </>
        }
      >
        <>
          <ClayAlert displayType="warning" title={i18n.get('alert')}>
            {i18n.get(
              'this-csv-file-contains-user-supplied-inputs-apening-a-csv-file-in-a-spreadsheet-program-may-be-dangerous',
            )}
          </ClayAlert>
          <ClayForm.Group>
            <label>{i18n.get('file-extension')}</label>
            <ClaySelect
              aria-label="Select Label"
              id="mySelectId"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              {options.map((item) => (
                <ClaySelect.Option
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </ClaySelect>
            <span className="home--help-text">
              {i18n.get(
                'the-export-includes-data-from-all-fields-and-form-versions-all-the-information-regarding-date-and-time-are-only-exported-in-gmt-0',
              )}
            </span>
          </ClayForm.Group>
        </>
      </Modal>
    </>
  );
};

const KnowledgeArea: React.FC = () => (
  <SkillContextProvider>
    <HomeTemplate>
      <KnowledgeAreaHeader />
      <KnowledgeAreaManagement />
    </HomeTemplate>
  </SkillContextProvider>
);

export default withAuth(KnowledgeArea);
