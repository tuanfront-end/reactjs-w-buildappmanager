import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { sendMailCustomersEndpoint } from 'api/Endpoint';

export interface SendMailParams {
  emails: string;
  subject: string;
  content: string;
}

export const sendMailCustomers = createAsyncAction(['@sendMailCustomersRequest', '@sendMailCustomersSuccess', '@sendMailCustomersFailure'])<
  { endpoint: typeof sendMailCustomersEndpoint; parmas: SendMailParams },
  { status: 'success'; msg: string },
  { status: 'error'; msg: string }
>();

export const useSendMailCustomersRequest = createDispatchAsyncAction(sendMailCustomers);
