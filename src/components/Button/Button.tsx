import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: Function;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({ className = 'pv2 ph3 ba b--black-10', style = {}, onClick, children, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={() => onClick && onClick()} className={className} style={style}>
      {children}
    </button>
  );
}
