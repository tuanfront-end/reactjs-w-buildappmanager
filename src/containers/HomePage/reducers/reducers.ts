import { customersReducer } from './reducerCustomers';
import { latestVersionReducer } from './reducerLatestVersion';
import { sendMailsReducer } from './reducerSendMails';
import { statisticMobileAppReducer } from './reducerStatisticMobileApp';

const homePage = {
  customers: customersReducer,
  latestVersion: latestVersionReducer,
  sendMails: sendMailsReducer,
  statisticMobileApp: statisticMobileAppReducer,
};

export default homePage;
