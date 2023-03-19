import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as BottomLineSvg } from '../assets/bottomLine.svg'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import { Button } from '../components/ui/Button'

import classes from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <motion.div
        className={classes.container}
        animate={{ x: '0%' }}
        exit={{ opacity: 1 }}
        initial={{ x: '100%' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <div className={classes.container}>
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
        </div>

        <button onClick={() => navigate('/scanning')}>To scanning</button>
      </motion.div>
    </>
  )
}
