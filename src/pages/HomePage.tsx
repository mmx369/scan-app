import { useNavigate } from 'react-router-dom'
import { ReactComponent as BuySvg } from '../assets/buy.svg'
import Button from '../ui/Button'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <div>КАРТИНКА</div>
      <h3>СКАНИРУЙ ПОКУПАЙ КАЙФУЙ</h3>
      <div>
        Поднесите камеру, нейросети сами поймут что это и добавят в корзину.
        <span>
          <BuySvg /> Buy
        </span>
      </div>
      <Button
        children='Понятно, вперед!'
        typeButton='button'
        onClick={() => navigate('scan')}
      />
    </div>
  )
}
