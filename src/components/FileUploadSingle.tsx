import axios from 'axios'
import { ChangeEvent, useContext } from 'react'
import AppContext from '../store/app-context'

function FileUploadSingle({ setIsShowPreviewProduct, setIsLoading, setIsShowError, setErrorMessage }: any) {
  const appCtx = useContext(AppContext)
  // const upload_url_test = 'http://localhost:5000'
  const upload_url = 'https://qbuy-api-gqzhjffxga-lm.a.run.app/images'

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const data = new FormData()
    if (e.target.files) {
      data.append('file', e.target.files[0])
    }

    try {
      //   to google_api
      const product = await axios.post<any>(`${upload_url}`, data, { timeout: 15000 })
      console.log('Product:', product)
      console.log('Response:', product.data)

      if (product.data.id) {
        appCtx.addProduct(product.data)
        setIsShowPreviewProduct(true)
        setIsLoading(false)
      } else if (product.data.article) {
        setErrorMessage(
          `Продукт успешно распознан, артикул ${product.data.article}, однако к сожалению на настоящий момент в базе отсутствует. Попробуйте другой продукт.`
        )
        setIsShowError(true)
        setIsLoading(false)
      } else if (!product.data) {
        setErrorMessage('Продукт не распознан, попробуйте сделать фото еще раз')
        setIsShowError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setErrorMessage('Что-то пошло не так. Попробуйте позднее.')
      setIsShowError(true)
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
    </div>
  )
}

export default FileUploadSingle
