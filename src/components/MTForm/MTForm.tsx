import React, { useState, useEffect, ChangeEvent, ReactNode } from 'react';
import { TextField, Button, Select, MenuItem, Chip, Tooltip, FormControl, InputLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CloudUpload } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker, DateTimePicker } from '@material-ui/pickers';
import { MTFormItem, MTFormItemDatePicker, MTFormItemText, MTFormItemSelect, MTFormItemSelectMulti, MTFormItemCheckBox } from './types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > *:not(.MuiCheckbox-root)': {
        flexGrow: 1,
      },
      '& > * .MuiTypography-body1': {
        fontSize: 12,
      },
    },
    button: {
      padding: theme.spacing(2),
    },
    title: {
      margin: theme.spacing(2),
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }),
);

export interface MTFormProps {
  data: MTFormItem[];
  title?: string;
  onChange?: (label: string) => void;
  onSubmit?: (data: MTFormItem[]) => void;
  renderSubmit?: () => ReactNode;
}

export default function MTForm({ data, onChange, onSubmit, title, renderSubmit }: MTFormProps) {
  const classes = useStyles();

  const [dataState, setDataState] = useState(data);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  const setDataStateFromItem = (item: MTFormItem, value: MTFormItem['value']) => {
    const newData = dataState.map(formItem => {
      if (formItem.key === item.key) {
        return { ...formItem, value };
      }
      return formItem;
    }) as MTFormItem[];
    setDataState(newData);
    onChange?.(item.label);
  };

  const hanldeChangeText = (item: MTFormItemText) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setDataStateFromItem(item, value);
  };

  const handleChangeDatePicker = (item: MTFormItemDatePicker) => (date: MaterialUiPickersDate, value?: string | null) => {
    setDataStateFromItem(item, String(date));
  };

  const handleDateTimePickerChange = (item: MTFormItemDatePicker) => (date: MaterialUiPickersDate, value?: string | null) => {
    setDataStateFromItem(item, String(date));
  };

  const hanldeChangeSelect = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    item: MTFormItemSelect,
  ) => {
    setDataStateFromItem(item, event.target.value as string);
  };

  const hanldeChangeSelectMulti = (event: React.ChangeEvent<{ name?: string; value: unknown }>, item: MTFormItemSelectMulti) => {
    setDataStateFromItem(item, event.target.value as string[]);
  };

  const handleChangeCheckBox = (item: MTFormItemCheckBox) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setDataStateFromItem(item, checked);
  };

  const renderText = (item: MTFormItemText) => {
    const notValid = item.validation && !(item.value as string).match(item.validation);
    return (
      <TextField
        key={item.key}
        label={item.label}
        disabled={item.disable}
        onChange={hanldeChangeText(item)}
        variant="outlined"
        value={item.value}
        placeholder={item.placeholder}
        error={!!notValid}
      />
    );
  };

  const renderDatePicker = (item: MTFormItemDatePicker) => {
    return (
      <KeyboardDatePicker
        key={item.key}
        label={item.label}
        clearable
        value={item.value as ParsableDate}
        placeholder="10/10/2022"
        onChange={handleChangeDatePicker(item)}
        format="MM/dd/yyyy"
      />
    );
  };
  const renderTimePicker = (item: MTFormItemDatePicker) => {
    return (
      <KeyboardTimePicker
        key={item.key}
        label={item.label}
        placeholder="08:00 AM"
        mask="__:__ _M"
        value={item.value as ParsableDate}
        onChange={handleChangeDatePicker(item)}
      />
    );
  };

  const renderDateTimePicker = (item: MTFormItemDatePicker) => {
    return (
      <DateTimePicker
        key={item.key}
        autoOk
        ampm={true}
        disableFuture
        value={item.value}
        onChange={handleDateTimePickerChange(item)}
        label={item.label}
      />
    );
  };

  const renderTextArea = (item: MTFormItemText) => {
    return (
      <TextField
        multiline
        rows={4}
        key={item.key}
        label={item.label}
        disabled={item.disable}
        onChange={hanldeChangeText(item)}
        variant="outlined"
        value={item.value}
      />
    );
  };

  const renderSelect = (item: MTFormItemSelect) => {
    return (
      <FormControl key={item.key}>
        <InputLabel>{item.label}</InputLabel>
        <Select
          label={item.label}
          disabled={item.disable}
          onChange={event => hanldeChangeSelect(event, item)}
          value={item.value}
          renderValue={selected => <Chip label={selected as string} className={classes.chip} />}
        >
          {item.options.map(i => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  const renderSelectMulti = (item: MTFormItemSelectMulti) => {
    return (
      <FormControl key={item.key}>
        <InputLabel>{item.label}</InputLabel>
        <Select
          multiple
          key={item.key}
          label={item.label}
          disabled={item.disable}
          onChange={event => hanldeChangeSelectMulti(event, item)}
          renderValue={selected => (
            <div className={classes.chips}>
              {(selected as string[]).map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          value={item.value}
        >
          {item.options.map(i => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const renderCheckbox = (item: MTFormItemCheckBox) => {
    return (
      <Tooltip title={item.label} aria-label={item.label} key={item.key}>
        <Checkbox checked={item.value} name={item.key} onChange={handleChangeCheckBox(item)} />
      </Tooltip>
    );
  };

  const renderItem = (item: MTFormItem) => {
    switch (item.type) {
      case 'text':
        return renderText(item);
      case 'textarea':
        return renderTextArea(item);
      case 'datePicker':
        return renderDatePicker(item);
      case 'timePicker':
        return renderTimePicker(item);
      case 'dateTimePicker':
        return renderDateTimePicker(item);
      case 'seclect':
        return renderSelect(item);
      case 'seclectMulti':
        return renderSelectMulti(item);
      case 'checkbox':
        return renderCheckbox(item);
      default:
        return null;
    }
  };

  return (
    <div className="mv4 pa3 ba b--black-10 br4">
      {title && <h4 className={classes.title}>{title}</h4>}
      <form
        className={`${classes.root} flex flex-wrap justify-between items-center`}
        noValidate
        autoComplete="off"
        onSubmit={event => {
          event.preventDefault();
          onSubmit?.(dataState);
        }}
      >
        {dataState.map(renderItem)}
        <br />
        <footer className="db w-100 flex-shrink-0" style={{ width: '100%' }}>
          {renderSubmit ? (
            renderSubmit()
          ) : (
            <Button className={classes.button} type="submit" variant="contained" color="primary" size="large" startIcon={<CloudUpload />}>
              Update
            </Button>
          )}
        </footer>
      </form>
    </div>
  );
}
