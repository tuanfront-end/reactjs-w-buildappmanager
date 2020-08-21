import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getCustomersEndpoint } from 'api/Endpoint';
import { DataCustomers, DataCustomersError } from 'api/customers';

export const getCustomers = createAsyncAction(['@getCustomersRequest', '@getCustomersSuccess', '@getCustomersFailure'])<
  { endpoint: typeof getCustomersEndpoint },
  { data: DataCustomers },
  { data: DataCustomersError }
>();

export const useGetCustomersRequest = createDispatchAsyncAction(getCustomers);
