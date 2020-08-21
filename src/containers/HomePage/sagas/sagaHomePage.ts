import watchGetCustomers from './watchGetCustomers';
import watchGetLatestVersion from './watchGetLatestVersion';
import watchUpdateLatestVersion from './watchUpdateLatestVersion';
import watchGetStatisticMobileApp from './watchGetStatisticMobileApp';
import watchGetStatisticProducts from './watchGetStatisticProducts';
import watchUpdateAppointment from './watchUpdateAppointment';
import watchSendMailCustomers from './watchSendMailCustomers';

const sagaHomePage = [
  watchSendMailCustomers,
  watchUpdateAppointment,
  watchGetCustomers,
  watchGetLatestVersion,
  watchUpdateLatestVersion,
  watchGetStatisticMobileApp,
  watchGetStatisticProducts,
];

export default sagaHomePage;
