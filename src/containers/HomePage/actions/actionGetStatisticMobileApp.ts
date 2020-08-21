import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { getStatisticMobileAppEndpoint } from 'api/Endpoint';
import { StatisticMobileAppItem } from 'api/statistic';

export const getStatisticMobileApp = createAsyncAction([
  '@getStatisticMobileAppRequest',
  '@getStatisticMobileAppSuccess',
  '@getStatisticMobileAppFailure',
])<
  { endpoint: typeof getStatisticMobileAppEndpoint },
  {
    data: {
      items: StatisticMobileAppItem[];
      status: 'success';
    };
  },
  {
    status: string;
    msg: string;
  }
>();

export const useGetStatisticMobileAppRequest = createDispatchAsyncAction(getStatisticMobileApp);
