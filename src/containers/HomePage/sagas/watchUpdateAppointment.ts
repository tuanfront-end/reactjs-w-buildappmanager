import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { updateAppointment } from '../actions/actionUpdateAppointment';

function* handleUpdateAppointment({ payload }: ReturnType<typeof updateAppointment.request>) {
  try {
    const res: AxiosResponse<{ status: 'success'; msg: string; emailContent: string }> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      params: payload.params,
    });
    yield put(
      updateAppointment.success({
        params: payload.params,
        data: {
          emailContent: res.data.emailContent,
          msg: res.data.msg,
        },
      }),
    );
  } catch (err) {
    yield put(updateAppointment.failure({ data: { status: 'error', msg: JSON.stringify(err) } }));
  }
}

export default function* watchUpdateAppointment() {
  yield takeLatest(getActionType(updateAppointment.request), handleUpdateAppointment);
}
