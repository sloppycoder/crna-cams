import React from 'react';
import AccountListScreen from '../AccountListScreen';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const tree = renderer.create(<AccountListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
