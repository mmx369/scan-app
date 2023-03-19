import React, { DOMAttributes } from 'react'

import classes from './Button.module.css'

export type ButtonType = 'button' | 'submit' | 'reset'

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string
  isDisabled?: boolean
  typeButton?: ButtonType
  icon?: any
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
  return (
    <button
      className={
        className === 'btn__product'
          ? classes.btn__product
          : className === 'btn__plus_scan'
          ? classes.btn__plus_scan
          : className === 'btn__plus_scan_sm'
          ? classes.btn__plus_scan_sm
          : className === 'btn__delete'
          ? classes.btn__delete
          : classes.btn
      }
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...props}
    >
      <div className={classes.btn_title}>
        <div style={{ paddingTop: 2 }}>{children}</div>
        <div style={{ marginLeft: 6 }}>{icon && <img src={icon} alt='' />}</div>
      </div>
    </button>
  )
}
