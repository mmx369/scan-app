import { motion } from 'framer-motion'
import PhotoCamera from '../components/PhotoCamera'
import classes from './Scanning.module.css'

export default function Scanning() {
  return (
    <motion.div
      className={classes.container}
      animate={{ x: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ x: '100%' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      {/* <Camera /> */}
      <PhotoCamera />
    </motion.div>
  )
}
