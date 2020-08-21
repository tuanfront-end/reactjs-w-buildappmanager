import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { sendMailCustomers } from '../actions/actionSendMailCustomers';
import { updateAppointment } from '../actions/actionUpdateAppointment';

export interface SendMailState {
  isLoading: boolean;
  status?: 'success' | 'error';
  msg?: string;
  parmas?: {
    emailContent: string;
    msg: string;
  };
  userIds: string;
}
export type getSendMailAction = ActionTypes<typeof sendMailCustomers | typeof updateAppointment>;

const initialState: SendMailState = {
  isLoading: false,
  userIds: '',
};

export const sendMailsReducer = createReducer<SendMailState, getSendMailAction>(initialState, [
  handleAction('@sendMailCustomersRequest', (state, action) => ({
    ...state,
    isLoading: true,
    userIds: action.payload.parmas.emails,
  })),

  handleAction('@sendMailCustomersSuccess', (state, action) => ({
    ...state,
    isLoading: true,
    msg: action.payload.msg,
  })),
  handleAction('@updateAppointmentSuccess', (state, action) => ({
    ...state,
    parmas: {
      emailContent: action.payload.data.emailContent,
      msg: action.payload.data.msg,
    },
  })),

  handleAction('@sendMailCustomersFailure', (state, action) => ({
    ...state,
    isLoading: false,
    msg: action.payload.msg,
  })),
]);
