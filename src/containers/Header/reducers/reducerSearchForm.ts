import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { searchCustomers } from '../actions/actionSearchCustomers';
import { MTFormItem } from 'components/MTForm/types';

export interface SearchFormState {
  data: MTFormItem[];
}
export type searchFormAction = ActionTypes<typeof searchCustomers>;

const searchFormData: MTFormItem[] = [
  {
    label: 'User ID',
    key: 'userId',
    type: 'text',
    value: '',
  },
  {
    label: 'User Name',
    key: 'username',
    type: 'text',
    value: '',
  },
  {
    label: 'Product Ids',
    key: 'productIds',
    type: 'text',
    value: '',
    placeholder: 'ex: id1;id2;id3...',
  },
  {
    label: 'Mode',
    key: 'mode',
    type: 'seclect',
    options: ['all', 'buildAppBundle'],
    value: '',
  },
  {
    label: 'Order Status',
    key: 'orderStatus',
    type: 'seclectMulti',
    value: [],
    options: ['wc-processing', 'wc-completed', 'wc-on-hold', 'wc-cancelled', 'wc-refuneded', 'all'],
  },
  {
    label: 'Is Schedule BuildApp',
    key: 'isScheduleBuildApp',
    type: 'checkbox',
    value: false,
  },
];

const initialState: SearchFormState = {
  data: searchFormData,
};

export const searchFormReducer = createReducer<SearchFormState, searchFormAction>(initialState, [
  handleAction('@searchCustomersRequest', (state, action) => ({
    ...state,
    data: action.payload.searchForm,
  })),
]);
