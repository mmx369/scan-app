import { useNavigate } from 'react-router-dom'
import { ReactComponent as CameraIconSvg } from '../assets/camera.svg'
import Button from '../ui/Button'

export default function ScanPage() {
  const navigate = useNavigate()
  return (
    <div>
      МОИ ТОВАРЫ
      <Button
        children='Сканировать'
        icon={CameraIconSvg}
        typeButton='button'
        onClick={() => navigate('/scanning')}
      />
    </div>
  )
}
