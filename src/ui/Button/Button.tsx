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
  return (
    <button
      className={classes.btn}
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}
