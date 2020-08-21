import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { DataCustomers } from 'api/customers';
import { searchCustomers } from '../actions/actionSearchCustomers';
import { path } from 'ramda';

function* handleSearchCustomers({ payload }: ReturnType<typeof searchCustomers.request>) {
  try {
    const res: AxiosResponse<DataCustomers> = yield call(fetchAPI.request, {
      params: payload.params,
      url: payload.endpoint,
    });
    yield put(searchCustomers.success({ data: res.data }));
  } catch (err) {
    const errMsg = path(['response', 'data'], err);
    yield put(searchCustomers.failure({ data: { status: 'error', msg: JSON.stringify(errMsg) || 'Error Message' } }));
  }
}

export default function* watchSearchCustomers() {
  yield takeLatest(getActionType(searchCustomers.request), handleSearchCustomers);
}
