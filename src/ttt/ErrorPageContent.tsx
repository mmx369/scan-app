function PageContent({ title, children }: any) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default PageContent
