import { useRouteError } from 'react-router-dom'

import PageContent from '../Components/ErrorPageContent'

function ErrorPage() {
  const error: any = useRouteError()
  console.log('ERRROR!!', error)

  let title = 'An error occurred!'
  let message = 'Something went wrong!'

  if (error.status === 500) {
    message = error.data.message
  }
  if (error.status === 404) {
    title = 'Not found!'
    message = 'Could not find resource or page.'
  }

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage
