import { motion } from 'framer-motion'
import CameraNew from '../Components/CameraNew'

import classes from './Scanning.module.css'

export default function Scanning() {
  return (
    <motion.div
      className={classes.root}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <CameraNew />
    </motion.div>
  )
}
