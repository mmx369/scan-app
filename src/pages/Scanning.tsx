import { motion } from 'framer-motion'
import CameraNew from '../Components/CameraNew'

export default function Scanning() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.6 } }}
    >
      <div>Scanning</div>
      <CameraNew />
    </motion.div>
  )
}
