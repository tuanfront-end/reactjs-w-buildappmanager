import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { updateAppointmentEndpoint } from 'api/Endpoint';

export interface UpdateAppointmentParam {
  datetime: string;
  userId: number;
  orderId: string;
}

export const updateAppointment = createAsyncAction(['@updateAppointmentRequest', '@updateAppointmentSuccess', '@updateAppointmentFailure'])<
  { endpoint: typeof updateAppointmentEndpoint; params: UpdateAppointmentParam },
  {
    params: UpdateAppointmentParam;
    data: {
      emailContent: string;
      msg: string;
    };
  },
  { data: { status: string; msg: string } }
>();

export const useUpdateAppointmentRequest = createDispatchAsyncAction(updateAppointment);
