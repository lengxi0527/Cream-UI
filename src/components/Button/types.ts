export type ButtonType = 'primary' | 'danger' | 'info' | 'success' | 'warning';

export type ButtonSize = 'large' | 'small'

export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
}

export interface ButtonInstance{
  ref?: HTMLButtonElement
}
