import React from 'react';
import { CSVLink } from 'react-csv';

const CSV = ({ csv }) => {
  if (csv.length > 0) {
    const now = new Date();
    return (
      <CSVLink
        data={csv}
        separator={';'}
        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-fullWidth"
        filename={`hash-data-iu-${now.getTime()}.csv`}
      >
        Download result
      </CSVLink>
    );
  }

  return '';
};

export default CSV;
