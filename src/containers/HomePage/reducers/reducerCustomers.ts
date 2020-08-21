import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { getCustomers } from '../actions/actionGetCustomers';
import { updateAppointment } from '../actions/actionUpdateAppointment';
import { Customer } from 'api/customers';
import { searchCustomers } from 'containers/Header/actions/actionSearchCustomers';

export interface CustomerState {
  isLoading: boolean;
  errorMessage?: string;
  data: Customer[];
  status: 'success' | 'error' | '';
}
export type getCustomerAction = ActionTypes<typeof getCustomers | typeof searchCustomers | typeof updateAppointment>;

const initialState: CustomerState = {
  isLoading: true,
  errorMessage: '',
  data: [],
  status: '',
};

export const customersReducer = createReducer<CustomerState, getCustomerAction>(initialState, [
  handleAction('@getCustomersRequest', state => ({
    ...state,
    isLoading: true,
    status: '',
  })),
  handleAction('@searchCustomersRequest', state => ({
    ...state,
    isLoading: true,
    status: '',
  })),
  handleAction('@updateAppointmentRequest', state => ({
    ...state,
    isLoading: true,
    status: '',
  })),
  // --- Request ------
  handleAction('@getCustomersSuccess', (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload.data.customers || [],
    errorMessage: action.payload.data.msg,
  })),
  handleAction('@searchCustomersSuccess', (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload.data.customers || [],
    errorMessage: action.payload.data.msg,
  })),
  handleAction('@updateAppointmentSuccess', (state, action) => {
    const { userId, datetime } = action.payload.params;
    const newUsers = state.data.map(item => {
      if (item.userInfo.userID === userId) {
        return {
          ...item,
          appInfo: {
            ...item.appInfo,
            appointment: datetime,
          },
        };
      }
      return item;
    });
    return {
      ...state,
      isLoading: false,
      data: newUsers,
      status: 'success',
    };
  }),
  // --- Success ------
  handleAction('@getCustomersFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
    status: 'error',
  })),
  handleAction('@searchCustomersFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
    status: 'error',
  })),
  handleAction('@updateAppointmentFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
    status: 'error',
  })),
]);
