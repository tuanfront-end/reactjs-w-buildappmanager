import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { updateLatestVersionEndpoint } from 'api/Endpoint';
import { Version } from 'api/version';

export const updateLatestVersion = createAsyncAction(['@updateLatestVersionRequest', '@updateLatestVersionSuccess', '@updateLatestVersionFailure'])<
  { endpoint: typeof updateLatestVersionEndpoint; version: string },
  { data: Version },
  { data: { status: string; msg: string } }
>();

export const useUpdateLatestVersionRequest = createDispatchAsyncAction(updateLatestVersion);
