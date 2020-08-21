import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { updateLatestVersion } from '../actions/actionUpdateLatestVersion';

function* handleUpdateLatestVersion({ payload }: ReturnType<typeof updateLatestVersion.request>) {
  try {
    const res: AxiosResponse<{ status: 'success'; msg: 'The version has been updated' }> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      params: {
        version: payload.version,
      },
    });
    yield put(updateLatestVersion.success({ data: { ...res.data, version: payload.version } }));
  } catch (err) {
    yield put(updateLatestVersion.failure({ data: { status: 'error', msg: 'Error Message' } }));
  }
}

export default function* watchUpdateLatestVersion() {
  yield takeLatest(getActionType(updateLatestVersion.request), handleUpdateLatestVersion);
}
