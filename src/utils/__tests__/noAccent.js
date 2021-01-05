import noAccent from '../noAccent';

test('no accent', () => {
  expect(noAccent('éÈÀöÔûÜçÇñÑ')).toEqual('eEAoOuUcCnN');
});
