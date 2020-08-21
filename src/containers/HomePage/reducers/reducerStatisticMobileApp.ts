import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { updateAppointment } from '../actions/actionUpdateAppointment';
import { StatisticMobileAppItem } from 'api/statistic';
import { getStatisticMobileApp } from '../actions/actionGetStatisticMobileApp';

export interface StatisticMobileAppState {
  isLoading: boolean;
  msg?: string;
  data: StatisticMobileAppItem[];
  status?: 'success' | 'error' | '';
}
export type getStatisticMobileAppAction = ActionTypes<typeof getStatisticMobileApp>;

const initialState: StatisticMobileAppState = {
  isLoading: true,
  msg: '',
  data: [],
};

export const statisticMobileAppReducer = createReducer<StatisticMobileAppState, getStatisticMobileAppAction>(initialState, [
  handleAction('@getStatisticMobileAppRequest', state => ({
    ...state,
    isLoading: true,
    status: '',
  })),
  handleAction('@getStatisticMobileAppSuccess', (state, action) => ({
    ...state,
    isLoading: true,
    data: action.payload.data.items,
    status: action.payload.data.status,
  })),
  handleAction('@getStatisticMobileAppFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.msg,
    status: 'error',
  })),
]);
