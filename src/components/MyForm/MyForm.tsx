import React from 'react';
import WilForm from 'wil-form';
import Button from 'components/Button/Button';

export interface FormFieldItem {
  name: string;
  type: string;
  required: boolean;
  label: string;
  multiple?: boolean;
  options?: any[];
}

interface Props {
  data: FormFieldItem[];
  defaultResult: Record<string, any>;
}

const fakeFields: FormFieldItem[] = [
  {
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    label: 'Password',
  },
  {
    name: 'email',
    type: 'text',
    required: true,
    label: 'Email',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    multiple: false,
    options: [
      {
        name: '',
        label: '',
        checked: false,
      },
      {
        name: 'male',
        label: 'Male',
        checked: false,
      },
      {
        name: 'female',
        label: 'Female',
        checked: false,
      },
    ],
  },
];

const defaultResultFake = {
  username: 'Test',
};

const constraints = {
  username: {
    presence: {
      message: 'Username is required',
    },
    length: {
      minimum: 6,
      maximum: 10,
      message: 'Your username must be at least 6 characters and at most 10 characters',
    },
  },
  password: {
    presence: {
      message: 'Password is required',
    },
    special: {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      message: 'Special password.....',
    },
    length: {
      minimum: 5,
      message: 'Your password must be at least 5 characters',
    },
  },
  email: {
    presence: {
      message: 'Email is required',
    },
    special: {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email address is not valid',
    },
    length: {
      minimum: 5,
      message: 'Your password must be at least 5 characters',
    },
  },
  gender: {
    presence: {
      message: 'Gender is required',
    },
  },
};

function MyForm(props: Props) {
  const _renderInput = ({ name, type, required, label, error, defaultValue, onChange, onFocus }: any) => {
    return (
      <div className="mb3">
        <label>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </label>
        <br />
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          onChange={event => {
            const { value } = event.target;
            onChange(value);
          }}
          onFocus={event => {
            const { value } = event.target;
            onFocus(value);
          }}
        />
        <br />
        {error.status && <span style={{ color: 'red' }}>{error.message}</span>}
      </div>
    );
  };

  const _renderSelectAbc = ({ options, multiple, required, label, error, defaultValue, onChange, onFocus }: any) => {
    return (
      <div className="mb3">
        <label>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </label>
        <br />
        <select
          multiple={multiple}
          defaultValue={defaultValue}
          onChange={event => {
            const { value } = event.target;
            onChange(value);
          }}
          onFocus={event => {
            const { value } = event.target;
            onFocus(value);
          }}
        >
          {options.map((item: any) => {
            return (
              <option key={item.name} defaultValue={item.name} defaultChecked={item.checked}>
                {item.label}
              </option>
            );
          })}
        </select>
        {error.status && <div style={{ color: 'red' }}>{error.message}</div>}
      </div>
    );
  };

  const { data, defaultResult } = props;
  return (
    <form>
      <WilForm
        fields={data || fakeFields}
        constraints={constraints}
        defaultResult={defaultResult || defaultResultFake}
        defineRenderFields={{
          text: 'renderInput',
          password: 'renderInput',
          select: 'renderSelectAbc',
        }}
        renderInput={_renderInput}
        renderSelectAbc={_renderSelectAbc}
        renderElementWithIndex={{
          render: handleSubmit => {
            return (
              <div className="mv3">
                <Button type="submit" onClick={handleSubmit}>
                  submit
                </Button>
              </div>
            );
          },
          moveByIndex: dataLength => {
            return dataLength;
          },
        }}
        onSubmit={({ result, valid, errors }) => {
          if (valid) {
            console.log(result);
          } else {
            console.log(errors);
          }
        }}
      />
    </form>
  );
}

export default MyForm;
