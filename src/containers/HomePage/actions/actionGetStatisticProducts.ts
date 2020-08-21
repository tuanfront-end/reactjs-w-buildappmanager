import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getStatisticProductsEndpoint } from 'api/Endpoint';

export const getStatisticProducts = createAsyncAction([
  '@getStatisticProductsRequest',
  '@getStatisticProductsSuccess',
  '@getStatisticProductsFailure',
])<{ endpoint: typeof getStatisticProductsEndpoint }, { data: any }, { data: any }>();

export const useGetStatisticProductsRequest = createDispatchAsyncAction(getStatisticProducts);
