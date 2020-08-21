import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { getLatestVersion } from '../actions/actionGetLatestVersion';
import { Version } from 'api/version';

function* handleGetLatestVersion({ payload }: ReturnType<typeof getLatestVersion.request>) {
  try {
    const res: AxiosResponse<Version> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    });
    yield put(getLatestVersion.success({ data: res.data }));
  } catch (err) {
    yield put(getLatestVersion.failure({ data: { status: 'error', msg: 'Error Message' } }));
  }
}

export default function* watchGetLatestVersion() {
  yield takeLatest(getActionType(getLatestVersion.request), handleGetLatestVersion);
}
