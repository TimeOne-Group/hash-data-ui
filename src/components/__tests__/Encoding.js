import React from 'react';
import renderer from 'react-test-renderer';
import Encoding from '../Encoding';

test('Encoding is being rendered', () => {
  const component = renderer.create(<Encoding />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
