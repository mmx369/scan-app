import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import classes from './Checkout.module.css'

export default function Checkout() {
  return (
    <motion.div
      className={classes.container}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <div>Это страница оплаты</div>
      <div>
        <Link to={'/cart'} style={{ textDecoration: 'none' }}>
          Продолжить покупки
        </Link>
      </div>
    </motion.div>
  )
}
