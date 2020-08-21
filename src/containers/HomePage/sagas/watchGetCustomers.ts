import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { DataCustomers } from 'api/customers';
import { getCustomers } from '../actions/actionGetCustomers';

function* handleGetCustomers({ payload }: ReturnType<typeof getCustomers.request>) {
  try {
    const res: AxiosResponse<DataCustomers> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    yield put(getCustomers.success({ data: res.data }));
  } catch (err) {
    yield put(getCustomers.failure({ data: { status: 'error', msg: JSON.stringify(err) || 'Error Message' } }));
  }
}

export default function* watchGetCustomers() {
  yield takeLatest(getActionType(getCustomers.request), handleGetCustomers);
}
