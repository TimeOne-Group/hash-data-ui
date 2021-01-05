import React from 'react';
import renderer from 'react-test-renderer';
import Hashing from '../Hashing';

test('Hashing is being rendered', () => {
  const component = renderer.create(<Hashing />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
