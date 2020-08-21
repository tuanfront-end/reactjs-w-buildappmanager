import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getLatestVersionEndpoint } from 'api/Endpoint';
import { Version } from 'api/version';

export const getLatestVersion = createAsyncAction(['@getLatestVersionRequest', '@getLatestVersionSuccess', '@getLatestVersionFailure'])<
  { endpoint: typeof getLatestVersionEndpoint },
  { data: Version },
  { data: { status: string; msg: string } }
>();

export const usegetLatestVersionRequest = createDispatchAsyncAction(getLatestVersion);
