import { render } from '@testing-library/react';
import React from 'react';

import Panel from '../../../src/components/panel';

describe('Panel', () => {
  it('renders', () => {
    const { asFragment } = render(<Panel title="Liferay Grow" />);

    expect(asFragment).toMatchSnapshot();
  });

  it('renders with children', () => {
    const { queryByText } = render(
      <Panel title="Liferay Grow">
        <Panel.Item>
          <Panel.Title>My App</Panel.Title>
          <Panel.Body>
            <span>My Span</span>
          </Panel.Body>
        </Panel.Item>
      </Panel>,
    );

    expect(queryByText('Liferay Grow')).toBeTruthy();
    expect(queryByText('My App')).toBeTruthy();
    expect(queryByText('My Span')).toBeTruthy();
  });
});
