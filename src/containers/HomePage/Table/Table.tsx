import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Customer } from 'api/customers';
import { Theme, createStyles, Avatar, IconButton, Checkbox, Button, Tooltip, LinearProgress } from '@material-ui/core';
import { Visibility, Send } from '@material-ui/icons';
import { equals } from 'ramda';
import { SendMailState } from '../reducers/reducerSendMails';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    table: {
      minWidth: 650,
    },
    button: {
      margin: theme.spacing(1),
    },
  });
});

export interface MyTableProps {
  data: Customer[];
  onViewMore?: (userID: number) => void;
  onClickSendMail: (emails: string[]) => void;
  sendMailsSelector: SendMailState;
}

export default function MyTable({ data, onViewMore, onClickSendMail, sendMailsSelector }: MyTableProps) {
  const classes = useStyles();

  const [sendMails, setSendMails] = useState<string[]>([]);

  const getTableRow = () => {
    const customers = data.map(item => item.userInfo);
    const customer = customers[0];
    const rowEl = Object.entries(customer).map(item => item[0] as keyof typeof customer);
    return rowEl;
  };

  const customerEmails = data.map(item => item.userInfo.userEmail);

  const hanldeChangeCheckboxAll = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      return setSendMails(customerEmails);
    }
    return setSendMails([]);
  };

  const hanldeChangeCheckbox = (userEmail: string) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) {
      return setSendMails([...sendMails, userEmail]);
    }
    return setSendMails(sendMails.filter(item => item !== userEmail));
  };

  const handleClickSendMail = () => onClickSendMail(customerEmails);

  const renderCellViewMore = (userID: number) => {
    return (
      <TableCell align="center" scope="row">
        <Tooltip title="View/Edit">
          <IconButton color="primary" aria-label="upload picture" onClick={() => onViewMore?.(userID)}>
            <Visibility />
          </IconButton>
        </Tooltip>
      </TableCell>
    );
  };

  const customers: Customer['userInfo'][] = data.map(item => item.userInfo);
  const tableRowName = getTableRow();

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" scope="row">
                <Tooltip title="Select for send Mail (all)">
                  <Checkbox
                    inputProps={{ 'aria-labelledby': 'all' }}
                    onChange={hanldeChangeCheckboxAll}
                    checked={equals(customerEmails, sendMails)}
                  />
                </Tooltip>
              </TableCell>
              {tableRowName.map(item => {
                return (
                  <TableCell align="center" key={item}>
                    {item}
                  </TableCell>
                );
              })}

              <TableCell align="center">View/Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((item, index) => (
              <TableRow key={String(item.userID || index)}>
                <TableCell align="left" scope="row">
                  <Tooltip title="Select for send Mail">
                    <Checkbox
                      checked={sendMails?.includes(item.userEmail)}
                      inputProps={{ 'aria-labelledby': item.displayName }}
                      onChange={hanldeChangeCheckbox(item.userEmail)}
                    />
                  </Tooltip>
                </TableCell>
                {tableRowName.map(j => {
                  return (
                    <TableCell key={j} align="center" scope="row">
                      {j === 'avatar' ? <Avatar alt={item.userName} style={{ margin: '0 auto' }} src={item.avatar} /> : item[j]}
                    </TableCell>
                  );
                })}
                {renderCellViewMore(item.userID)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderBtnSentMail = () => {
    return (
      <div className="mv3">
        {sendMailsSelector.isLoading && <LinearProgress />}
        {sendMailsSelector.msg && <Alert severity={sendMailsSelector.status}>{sendMailsSelector.msg}</Alert>}
        <div className="mv2">
          <Button variant="contained" color="primary" endIcon={<Send />} onClick={handleClickSendMail} disabled={!sendMailsSelector.parmas}>
            Send Mail
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="pa3 ba b--black-10 br3 mv3">
      {renderTable()}
      {renderBtnSentMail()}
    </div>
  );
}
