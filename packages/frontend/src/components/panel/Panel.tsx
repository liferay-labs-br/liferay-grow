import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React from 'react';

const PanelItem: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return (
    <ClayLayout.Col size={4} className="d-flex">
      <ClayCard className="p-2 flex-grow-1">{children}</ClayCard>
    </ClayLayout.Col>
  );
};

const PanelTitle: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <p className="panel--title">{children}</p>;
};

const PanelBody: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  return <div className="panel--body">{children}</div>;
};

interface IPanelProps {
  title: string;
}

const Panel: React.FC<IPanelProps> & {
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
      className="panel"
      showCollapseIcon
    >
      <ClayPanel.Body>
        <ClayLayout.Row>{children}</ClayLayout.Row>
      </ClayPanel.Body>
    </ClayPanel>
  );
};

Panel.Body = PanelBody;
Panel.Item = PanelItem;
Panel.Title = PanelTitle;

export default Panel;
