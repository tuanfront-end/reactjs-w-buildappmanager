export type OptionSelect = string;

export type MTFormItem = MTFormItemText | MTFormItemCheckBox | MTFormItemSelect | MTFormItemSelectMulti | MTFormItemDatePicker;

export interface MTFormItemDatePicker {
  type: 'datePicker' | 'timePicker' | 'dateTimePicker';
  label: string;
  key: string;
  value: string | Date;
  disable?: boolean;
}
export interface MTFormItemText {
  type: 'text' | 'textarea';
  key: string;
  label: string;
  value: string | number;
  disable?: boolean;
  placeholder?: string;
  validation?: RegExp;
}
export interface MTFormItemCheckBox {
  type: 'checkbox';
  key: string;
  label: string;
  value: boolean;
  disable?: boolean;
}

export interface MTFormItemSelect {
  type: 'seclect';
  key: string;
  label: string;
  value: OptionSelect;
  options: OptionSelect[];
  disable?: boolean;
}
export interface MTFormItemSelectMulti {
  type: 'seclectMulti';
  key: string;
  label: string;
  value: OptionSelect[];
  options: OptionSelect[];
  disable?: boolean;
}
