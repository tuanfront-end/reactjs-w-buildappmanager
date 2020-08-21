import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getCustomersEndpoint } from 'api/Endpoint';
import { DataCustomers, DataCustomersError } from 'api/customers';
import { MTFormItem } from 'components/MTForm/types';

export const searchCustomers = createAsyncAction(['@searchCustomersRequest', '@searchCustomersSuccess', '@searchCustomersFailure'])<
  { endpoint: typeof getCustomersEndpoint; params: Record<string, any>; searchForm: MTFormItem[] },
  { data: DataCustomers },
  { data: DataCustomersError }
>();

export const useSearchCustomersRequest = createDispatchAsyncAction(searchCustomers);
