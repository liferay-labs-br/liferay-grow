import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React from 'react';

const ProfilePanelItem: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <ClayLayout.Col size={4} className="d-flex">
      <ClayCard className="p-2 flex-grow-1">{children}</ClayCard>
    </ClayLayout.Col>
  );
};

const ProfilePanelTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <p className="profile__panel--title">{children}</p>;
};

const ProfilePanelBody: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="profile__panel--body">{children}</div>;
};

interface IProfilePanelProps {
  title: string;
}

const ProfilePanel: React.FC<IProfilePanelProps> & {
  Body: React.ElementType;
  Item: React.ElementType;
  Title: React.ElementType;
} = ({ children, title }) => {
  return (
    <ClayPanel
      collapsable
      defaultExpanded
      displayTitle={title}
      displayType="secondary"
      className="profile__panel"
      showCollapseIcon
    >
      <ClayPanel.Body>
        <ClayLayout.Row>{children}</ClayLayout.Row>
      </ClayPanel.Body>
    </ClayPanel>
  );
};

ProfilePanel.Body = ProfilePanelBody;
ProfilePanel.Item = ProfilePanelItem;
ProfilePanel.Title = ProfilePanelTitle;
export default ProfilePanel;
