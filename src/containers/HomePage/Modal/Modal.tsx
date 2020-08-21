import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import { Customer } from 'api/customers';
import { MTFormItem, MTFormItemDatePicker } from 'components/MTForm/types';
import MTForm from 'components/MTForm/MTForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: '90vh',
      maxWidth: '90vw',
      overflow: 'auto',
      margin: '0 auto',
    },
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const FadeAbc = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export interface SpringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Customer) => void;
  onSubmitAppointmentForm: (appointment: string) => void;
  data: Customer;
}

export default function SpringModal({ isOpen, onClose, data, onSubmit, onSubmitAppointmentForm }: SpringModalProps) {
  const classes = useStyles();

  const onSubmitForm = (formData: MTFormItem[]) => {
    // const appInfo = data.appInfo;
    // onSubmit({})
  };
  const onSubmitFormAppointment = (formData: MTFormItem[]) => {
    onSubmitAppointmentForm(formData[0].value as string);
  };

  const renderModalContent = () => {
    return (
      <div>
        <MTForm title="User Info" data={convertUserInfoToMTFormData(data)} onSubmit={onSubmitForm} />
        <MTForm title="App Info" data={convertAppInfoToMTFormData(data)} onSubmit={onSubmitForm} />
        <MTForm title="Appointment" data={convertAppointmentToMTFormData(data)} onSubmit={onSubmitFormAppointment} />
      </div>
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={() => onClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FadeAbc in={isOpen}>
          <div className={classes.paper}>{renderModalContent()}</div>
        </FadeAbc>
      </Modal>
    </div>
  );
}

function convertUserInfoToMTFormData(data: Customer): MTFormItem[] {
  const userInfors: MTFormItem[] = Object.entries(data.userInfo).map(users => ({
    label: users[0],
    key: users[0],
    value: users[1],
    type: 'text',
  }));
  return userInfors;
}

function convertAppInfoToMTFormData(data: Customer): MTFormItem[] {
  const appInfos = Object.entries(data.appInfo).map((items): MTFormItem | null => {
    if (typeof items[1] === 'string') {
      return {
        label: items[0],
        key: items[0],
        value: items[1],
        type: 'text',
      };
    }
    return null;
  });
  const newAppInfos = appInfos.filter(i => i !== null) as MTFormItem[];
  return newAppInfos;
}

function convertAppointmentToMTFormData(data: Customer): MTFormItemDatePicker[] {
  const date = new Date(Number(data.appInfo.appointment));
  const appointments = {
    label: 'Appointment - Date & Time',
    key: 'appointment',
    value: date,
    type: 'dateTimePicker' as 'dateTimePicker',
  };

  return [appointments];
}
