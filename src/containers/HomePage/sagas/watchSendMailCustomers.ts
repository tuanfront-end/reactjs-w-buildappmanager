import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { sendMailCustomers } from '../actions/actionSendMailCustomers';
import { getActionType } from 'utils/functions/reduxActions';

function* handleSendMailCustomers({ payload }: ReturnType<typeof sendMailCustomers.request>) {
  try {
    const res: AxiosResponse<{ status: string; msg: string }> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: payload.parmas,
      method: 'POST',
    });
    yield put(sendMailCustomers.success({ status: 'success', msg: res.data.msg }));
  } catch (err) {
    yield put(sendMailCustomers.failure({ status: 'error', msg: JSON.stringify(err) }));
  }
}

export default function* watchSendMailCustomers() {
  yield takeLatest(getActionType(sendMailCustomers.request), handleSendMailCustomers);
}
