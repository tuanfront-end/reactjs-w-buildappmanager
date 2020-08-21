import React from 'react';
import { getLatestVersionState } from '../reducers/reducerLatestVersion';
import { TextField, Button } from '@material-ui/core';
import { SaveOutlined } from '@material-ui/icons';

export interface LatestVersionProps {
  data: getLatestVersionState;
}

export default function LatestVersion({ data }: LatestVersionProps) {
  return (
    <div>
      <h2>Latest Version</h2>
      <form noValidate autoComplete="off">
        <TextField variant="outlined" label="App latest Version" defaultValue={data.data.version} />
        <br />
        <Button type="submit" variant="contained" color="primary" size="large" startIcon={<SaveOutlined />}>
          Save
        </Button>
      </form>
    </div>
  );
}
