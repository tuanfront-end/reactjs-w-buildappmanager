import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { getCustomers } from '../actions/actionGetCustomers';
import { Customer } from 'api/customers';
import { searchCustomers } from 'containers/Header/actions/actionSearchCustomers';

export interface getCustomerState {
  isLoading: boolean;
  errorMessage?: string;
  data: Customer[];
}
export type getCustomerAction = ActionTypes<typeof getCustomers | typeof searchCustomers>;

const initialState: getCustomerState = {
  isLoading: true,
  errorMessage: '',
  data: [],
};

export const customersReducer = createReducer<getCustomerState, getCustomerAction>(initialState, [
  handleAction('@getCustomersRequest', state => ({
    ...state,
    isLoading: true,
  })),
  handleAction('@searchCustomersRequest', state => ({
    ...state,
    isLoading: true,
  })),
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
  handleAction('@getCustomersFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
  })),
  handleAction('@searchCustomersFailure', (state, action) => ({
    ...state,
    isLoading: false,
    errorMessage: action.payload.data.msg,
  })),
]);
