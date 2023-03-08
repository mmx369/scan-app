import React, { DOMAttributes, FunctionComponent } from 'react'

import classes from './Button.module.css'

export type ButtonType = 'button' | 'submit' | 'reset'

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string
  isDisabled?: boolean
  typeButton?: ButtonType
  icon?: FunctionComponent
  onClick?: (event: any) => any
}

export const Button: React.FC<IButtonProps> = ({
  className,
  children,
  isDisabled,
  typeButton,
  icon,
  onClick,
  ...props
}) => {
  console.log(777, className)

  return (
    <button
      className={
        className === 'btn__product'
          ? classes.btn__product
          : className === 'btn__plus_scan'
          ? classes.btn__plus_scan
          : className === 'btn__delete'
          ? classes.btn__delete
          : classes.btn
      }
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...props}
    >
      <span className={classes.btn_title}>{children}</span> &nbsp;
    </button>
  )
}
