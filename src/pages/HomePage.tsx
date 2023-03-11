import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import Button from '../ui/Button'

import classes from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className={classes.root}>
      <motion.div
        className={classes.container}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ x: -window.innerWidth, transition: { duration: 0.2 } }}
      >
        <div className={classes.flexGrowBlock} />
        <div className={classes.upperFooter}>
          <div className={classes.upperFooter_text}>Поднесите камеру, нейросети сами поймут что это и добавят в корзину.</div>
          <div className={classes.upperFooter_buy}>
            <span>
              <BuySvg /> Buy
            </span>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footer_button}>
            <Button children='Понятно, вперёд!' typeButton='button' onClick={() => navigate('/cart')} />
          </div>

          <div className={classes.footer_img}>
            <BottomLineSvg />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
