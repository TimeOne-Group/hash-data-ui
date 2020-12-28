import React from 'react';
import { CSVLink } from 'react-csv';

const CSV = ({ csv }) => {
  if (csv.length > 0) {
    return (
      <CSVLink
        data={csv}
        separator={';'}
        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-fullWidth"
        filename={'encode-file-iu.csv'}
      >
        Download result
      </CSVLink>
    );
  }

  return '';
};

export default CSV;
