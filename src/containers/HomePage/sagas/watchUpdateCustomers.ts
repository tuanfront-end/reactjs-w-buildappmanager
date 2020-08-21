import { put, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';
import { updateCustomers } from '../actions/actionUpdateCustomers';

function* handleUpdateCustomers({ payload }: ReturnType<typeof updateCustomers.request>) {
  try {
    const res: AxiosResponse<Record<string, any>> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      method: 'POST',
      params: payload.params,
    });
    yield put(
      updateCustomers.success({
        data: {
          status: 'success',
          customers: payload.data,
          paged: 1,
        },
      }),
    );
  } catch (err) {
    yield put(updateCustomers.failure({ data: { status: 'error', msg: JSON.stringify(err) || 'Update Customer Error' } }));
  }
}

export default function* watchGetCustomers() {
  yield takeLatest(getActionType(updateCustomers.request), handleUpdateCustomers);
}
