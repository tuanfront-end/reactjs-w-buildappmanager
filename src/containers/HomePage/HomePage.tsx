import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customersSelector, latesVersionSelector, sendMailsSelector, statisticMobileAppSelector } from './selectors';
import Table from './Table/Table';
import { useGetCustomersRequest } from './actions/actionGetCustomers';
import { usegetLatestVersionRequest } from './actions/actionGetLatestVersion';
import { useUpdateLatestVersionRequest } from './actions/actionUpdateLatestVersion';
import { useGetStatisticMobileAppRequest } from './actions/actionGetStatisticMobileApp';
import { useGetStatisticProductsRequest } from './actions/actionGetStatisticProducts';
import { useUpdateAppointmentRequest } from './actions/actionUpdateAppointment';
import { useSendMailCustomersRequest, SendMailParams } from './actions/actionSendMailCustomers';
import {
  getCustomersEndpoint,
  getLatestVersionEndpoint,
  updateLatestVersionEndpoint,
  getStatisticMobileAppEndpoint,
  getStatisticProductsEndpoint,
  updateAppointmentEndpoint,
  sendMailCustomersEndpoint,
} from 'api/Endpoint';
import { isEmpty } from 'ramda';
import SpringModal from './Modal/Modal';
import { Customer } from 'api/customers';
import MTForm from 'components/MTForm/MTForm';
import { getLatestVersionState } from './reducers/reducerLatestVersion';
import { MTFormItem } from 'components/MTForm/types';
import LinearBuffer from 'components/LinearBuffer/LinearBuffer';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Charts from './actions/Charts/Charts';

const HomePage: FC = () => {
  const customers = useSelector(customersSelector);
  const latestVersion = useSelector(latesVersionSelector);
  const sendMails = useSelector(sendMailsSelector);
  const statisticMobileApp = useSelector(statisticMobileAppSelector);
  const getCustomers = useGetCustomersRequest();
  // const updateCustomers = useUpdateCustomersRequest();
  const getLatestVersion = usegetLatestVersionRequest();
  const getStatisticProductsRequest = useGetStatisticProductsRequest();
  const updateLatestVersion = useUpdateLatestVersionRequest();
  const updateAppointment = useUpdateAppointmentRequest();
  const sendMailCustomersRequest = useSendMailCustomersRequest();
  const getStatisticMobileAppRequest = useGetStatisticMobileAppRequest();

  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [customerActive, setCustomerActive] = useState<Customer>(customers.data[0]);

  useEffect(() => {
    getCustomers.request({ endpoint: getCustomersEndpoint });
    getLatestVersion.request({ endpoint: getLatestVersionEndpoint });
    getStatisticMobileAppRequest.request({ endpoint: getStatisticMobileAppEndpoint });
    getStatisticProductsRequest.request({ endpoint: getStatisticProductsEndpoint });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOpenSnackbar(true);
  }, [customers]);

  const getCustomerWithUserID = (userID: number): Customer => {
    return customers.data.filter(item => item.userInfo.userID === userID)[0];
  };

  const hanldeOnViewMore = (userID: number) => {
    const customer = getCustomerWithUserID(userID);
    setCustomerActive(customer);
    setOpenModal(true);
  };

  const onClickSendmail = (emails: string[]) => {
    if (!sendMails.parmas) return;
    const { emailContent, msg } = sendMails.parmas;
    const parmas: SendMailParams = {
      content: emailContent,
      subject: msg,
      // emails: [232323232323, 1212121212, 98989898].join(','),
      emails: emails.join(','),
    };
    sendMailCustomersRequest.request({ endpoint: sendMailCustomersEndpoint, parmas });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmitFormLatestVersion = (data: MTFormItem[]) => {
    const versions = data.filter(item => item.key === 'version')[0];
    if (versions.value && typeof versions.value === 'string') {
      updateLatestVersion.request({ endpoint: updateLatestVersionEndpoint, version: versions.value });
    }
  };

  const handleSubmitEditCustomerForm = (data: Customer) => {
    console.log({ data });
    // updateCustomers.request({ endpoint: getCustomersEndpoint, params: {}, data });
  };

  const handleCloseModal = () => setOpenModal(false);

  const onSubmitAppointmentForm = (appointment: string) => {
    handleCloseModal();
    updateAppointment.request({
      endpoint: updateAppointmentEndpoint,
      params: {
        userId: customerActive.userInfo.userID,
        datetime: String(Date.parse(appointment)),
        orderId: customerActive.appInfo.orderId,
      },
    });
  };

  const renderLatestVersion = () => {
    return (
      <div>
        <MTForm data={convertLatestVersionToFormData(latestVersion)} title="App Latest Version" onSubmit={onSubmitFormLatestVersion} />
        {latestVersion.data.msg && latestVersion.data.status === 'error' && <Alert severity="error">{latestVersion.data.msg}</Alert>}
        {latestVersion.data.msg && latestVersion.data.status === 'success' && <Alert severity="success">{latestVersion.data.msg}</Alert>}
      </div>
    );
  };

  const renderCustomerTable = () => {
    if (!customers.data) return null;
    if (isEmpty(customers.data)) {
      return <h3 className="ba b--black-10 br2 pa4 measure db mv1">Empty</h3>;
    }
    return (
      <div className="mv1">
        {<Table sendMailsSelector={sendMails} data={customers.data} onViewMore={hanldeOnViewMore} onClickSendMail={onClickSendmail} />}
      </div>
    );
  };

  const renderMain = () => {
    return (
      <React.Fragment>
        {customers.isLoading && <LinearBuffer />}
        {renderCustomerTable()}
        {customers.errorMessage && <Alert severity="error"> {customers.errorMessage}</Alert>}
      </React.Fragment>
    );
  };

  const renderSnackbar = () => {
    if (!customers.status) return null;
    return (
      <Snackbar open={openSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseSnackbar}>
        <Alert severity={customers.status} onClose={handleCloseSnackbar}>
          This is a success message!
        </Alert>
      </Snackbar>
    );
  };

  return (
    <div className="mw8 center pa4">
      <h3 className="mv3">Manager Customer Build App</h3>
      {renderMain()}
      {customerActive && (
        <SpringModal
          isOpen={openModal}
          onClose={handleCloseModal}
          data={customerActive}
          onSubmit={handleSubmitEditCustomerForm}
          onSubmitAppointmentForm={onSubmitAppointmentForm}
        />
      )}
      {renderLatestVersion()}
      <Charts statisticMobileApp={statisticMobileApp} />
      {renderSnackbar()}
    </div>
  );
};

export default HomePage;

function convertLatestVersionToFormData(latestVersion: getLatestVersionState): MTFormItem[] {
  const item: MTFormItem = {
    label: 'App Latest Version',
    key: 'version',
    type: 'text',
    value: latestVersion.data.version || 1,
  };
  return [item];
}
