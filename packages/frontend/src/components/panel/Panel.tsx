import ClayCard from '@clayui/card';
import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

type IPanelItem = {
  href?: string;
};

const PanelItem: React.FC<IPanelItem> = ({ children, href }) => {
  const PanelItem = (
    <ClayLayout.Col size={4} className="d-flex">
      <ClayCard
        className={classNames('p-2 flex-grow-1', {
          'profile__panel--link': href,
        })}
      >
        {children}
      </ClayCard>
    </ClayLayout.Col>
  );

  if (href) {
    return <Link href={href}>{PanelItem}</Link>;
  }

  return PanelItem;
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
  displayType?: 'secondary' | 'unstyled';
}

const Panel: React.FC<IPanelProps> & {
  Body: React.ElementType;
  Item: React.ElementType;
  Title: React.ElementType;
} = ({ children, displayType = 'secondary', title }) => {
  return (
    <ClayPanel
      collapsable
      defaultExpanded
      displayTitle={title}
      displayType={displayType}
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
