import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { getStatisticProducts } from '../actions/actionGetStatisticProducts';

function* handleGetStatisticProducts({ payload }: ReturnType<typeof getStatisticProducts.request>) {
  try {
    const res: AxiosResponse<any> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    yield put(getStatisticProducts.success({ data: res.data }));
  } catch (err) {
    yield put(getStatisticProducts.failure({ data: { status: 'error', msg: JSON.stringify(err) || 'Error Message' } }));
  }
}

export default function* watchGetStatisticProducts() {
  yield takeLatest(getActionType(getStatisticProducts.request), handleGetStatisticProducts);
}
