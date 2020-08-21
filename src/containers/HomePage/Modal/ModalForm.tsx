import React from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import { Customer } from 'api/customers';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        fontSize: 14,
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export interface ModalFormProps {
  data: Customer;
}

export default function ModalForm({ data }: ModalFormProps) {
  const classes = useStyles();

  const appInfo = Object.entries(data.appInfo) as [
    keyof typeof data.appInfo,
    (
      | string
      | {
          timestamp: boolean;
          date: string;
          time: string;
        }
    ),
  ][];
  const userInfo = Object.entries(data.userInfo) as [keyof typeof data.userInfo, string | number][];

  const renderItem = (
    value: [
      keyof typeof data.appInfo,
      (
        | string
        | {
            timestamp: boolean;
            date: string;
            time: string;
          }
      ),
    ],
  ) => {
    if (typeof value[1] !== 'string') {
      // const a = value[0] + '-' + 'date';
      // const b = value[0] + '-' + 'time';
      const c = value[0] + '-' + 'timestamp';
      return (
        <div key={value[0]}>
          <h3>{value[0]}</h3>
          <KeyboardDatePicker clearable value="10/ 10/ 2028" placeholder="10/10/2018" onChange={date => console.log(date)} format="MM/ dd/ yyyy" />
          <KeyboardTimePicker
            label="Masked timepicker"
            placeholder="08:00 AM"
            mask="__:__ _M"
            value="Thu Aug 14:03:19"
            // value={value[1].time}
            onChange={time => console.log(time)}
          />
          <TextField key={c} variant="outlined" id={`standard-required-${c}`} label={c} defaultValue={value[1].timestamp} disabled />
        </div>
      );
    }
    return <TextField key={value[0]} variant="outlined" id={`standard-required-${value[0]}`} label={value[0]} defaultValue={value[1]} />;
  };

  const renderItemOfUser = (value: [keyof typeof data.userInfo, string | number]) => {
    return <TextField key={value[0]} variant="outlined" id={`standard-required-${value[0]}`} label={value[0]} defaultValue={value[1]} />;
  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h3>App Info</h3>
        {appInfo.map(renderItem)}
        <h3>User Info</h3>
        {userInfo.map(renderItemOfUser)}
        <Divider />
        <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />}>
          Save
        </Button>
      </form>
    </div>
  );
}
