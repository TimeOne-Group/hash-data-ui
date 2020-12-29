import React from 'react';
import renderer from 'react-test-renderer';
import CSVReader from 'react-csv-reader';
import LoadCSV from '../LoadCSV';

const mockDispatch = (object) => {
  expect(object).toEqual({
    columns: [
      { field: 'field_1', headerName: 'column1', width: 250 },
      { field: 'field_2', headerName: 'column2', width: 250 },
    ],
    rows: [{ id: 1, field_1: 'row1_field1', field_2: 'row1_field2' }],
  });
};

test('LoadCSV is being rendered', () => {
  const component = renderer.create(<LoadCSV />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Load datas', async () => {
  const component = renderer.create(<LoadCSV dispatch={mockDispatch} />);
  component.root.findByType(CSVReader).props.onFileLoaded([
    ['column1', 'column2'],
    ['row1_field1', 'row1_field2'],
  ]);
});
