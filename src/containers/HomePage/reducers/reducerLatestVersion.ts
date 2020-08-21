import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { Version } from 'api/version';
import { getLatestVersion } from '../actions/actionGetLatestVersion';
import { updateLatestVersion } from '../actions/actionUpdateLatestVersion';

export interface getLatestVersionState {
  isLoading: boolean;
  data: Version;
}
export type getLatestVersionAction = ActionTypes<typeof getLatestVersion | typeof updateLatestVersion>;

const initialState: getLatestVersionState = {
  isLoading: true,
  data: {
    msg: '',
    version: '1.0',
    status: 'success',
  },
};

export const latestVersionReducer = createReducer<getLatestVersionState, getLatestVersionAction>(initialState, [
  handleAction('@getLatestVersionRequest', state => ({
    ...state,
    isLoading: true,
  })),
  handleAction('@updateLatestVersionRequest', state => ({
    ...state,
    isLoading: true,
  })),
  handleAction('@getLatestVersionSuccess', (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload.data,
  })),
  handleAction('@updateLatestVersionSuccess', (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload.data,
  })),
  handleAction('@getLatestVersionFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
  })),
  handleAction('@updateLatestVersionFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
  })),
]);
