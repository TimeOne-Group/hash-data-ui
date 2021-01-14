import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

import ButtonHash from '../ButtonHash';

const expectedProps = {
  addedColumnName: 'Added column',
  columns: [
    {
      field: 'field_1',
      headerName: 'Program ID',
      width: 250,
    },
    {
      field: 'field_2',
      headerName: 'Program',
      width: 250,
    },
  ],
  rows: [
    {
      id: 1,
      field_1: '1',
      field_2: 'prog1',
      field_add:
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    },
    {
      id: 2,
      field_1: '2',
      field_2: 'prog2',
      field_add:
        'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    },
  ],
  fields: [
    {
      selected: '',
      type: 'constant',
      constant: 'abc',
      completed: true,
      funcs: ['no accent'],
    },
  ],
  hashing: 'sha256',
};

describe('ButtonHash component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly the button hash', () => {
    const { baseElement } = render(<ButtonHash />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch an error on click if addedColumnName props is not defined ', () => {
    const dispatch = jest.fn();
    const { getByText } = render(<ButtonHash dispatch={dispatch} />);

    fireEvent.click(getByText('Hash'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      error: 'Added column name is empty',
    });
  });

  it('should dispatch an error on click if all fileds are not completed ', () => {
    const dispatch = jest.fn();
    const notCompletedFields = [...expectedProps.fields, { completed: false }];
    const { getByText } = render(
      <ButtonHash
        dispatch={dispatch}
        addedColumnName={expectedProps.addedColumnName}
        fields={notCompletedFields}
      />
    );

    fireEvent.click(getByText('Hash'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ error: 'No field selected' });
  });

  it('should dispatch newColumns, newRows and csv ', () => {
    const dispatch = jest.fn();
    const { getByText } = render(
      <ButtonHash dispatch={dispatch} {...expectedProps} />
    );

    fireEvent.click(getByText('Hash'));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      columns: [
        {
          field: 'field_1',
          headerName: 'Program ID',
          width: 250,
        },
        {
          field: 'field_2',
          headerName: 'Program',
          width: 250,
        },
        {
          field: 'field_add',
          headerName: 'Added column',
          width: 250,
        },
      ],
      csv: [
        ['Program ID', 'Program', 'Added column'],
        [
          '1',
          'prog1',
          'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
        ],
        [
          '2',
          'prog2',
          'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
        ],
      ],
      rows: [
        {
          field_1: '1',
          field_2: 'prog1',
          field_add:
            'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
          id: 1,
        },
        {
          field_1: '2',
          field_2: 'prog2',
          field_add:
            'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
          id: 2,
        },
      ],
    });
  });
});
