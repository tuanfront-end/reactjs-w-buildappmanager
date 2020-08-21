import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getCustomersEndpoint } from 'api/Endpoint';
import { DataCustomers, DataCustomersError, Customer } from 'api/customers';
import { useSelector } from 'react-redux';

export const updateCustomers = createAsyncAction(['@updateCustomersRequest', '@updateCustomersSuccess', '@updateCustomersFailure'])<
  { endpoint: typeof getCustomersEndpoint; params: Record<string, any>; data: Customer[] },
  { data: any },
  { data: DataCustomersError }
>();

export const useUpdateCustomersRequest = createDispatchAsyncAction(updateCustomers);
