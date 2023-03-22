import { useState } from 'react'
import { ReactComponent as CancelSvg } from '../assets/cancelRed.svg'
import classes from './ErrorPage.module.css'

type TProps = {
  setIsShowError: (x: boolean) => void
  message: string
}

export default function ErrorPage({ setIsShowError, message }: TProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsShowError(false)
    }, 300)
  }

  return (
    <div className={isVisible ? `${classes.container}` : `${classes.container} ${classes.down}`}>
      <div className={classes.error__wrapper}>{message}</div>

      <div className={classes.action} onClick={handleCancel}>
        <CancelSvg />
      </div>
    </div>
  )
}
