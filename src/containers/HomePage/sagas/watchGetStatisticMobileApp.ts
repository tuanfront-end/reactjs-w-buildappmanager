import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { getStatisticMobileApp } from '../actions/actionGetStatisticMobileApp';
import { StatisticMobileAppRes } from 'api/statistic';

function* handleGetStatisticMobileApp({ payload }: ReturnType<typeof getStatisticMobileApp.request>) {
  try {
    const res: AxiosResponse<StatisticMobileAppRes> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    yield put(getStatisticMobileApp.success({ data: res.data }));
  } catch (err) {
    yield put(getStatisticMobileApp.failure({ status: 'error', msg: JSON.stringify(err) || 'Error Message' }));
  }
}

export default function* watchGetStatisticMobileApp() {
  yield takeLatest(getActionType(getStatisticMobileApp.request), handleGetStatisticMobileApp);
}
