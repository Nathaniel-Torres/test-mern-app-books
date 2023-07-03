import Alert from 'react-bootstrap/Alert'

function UpdateNotice() {
  const githubRepo = '#'
  const heading = 'Important! (Please read below)'
  const updateNote = 'Last updated: 7/3/2023 3:34PM GMT+8'
  const changes = [
    'Design enhancement and some UI fixes.',
  ]

  return (
    <Alert variant='info' className='mb-3'>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>This web app is for live demonstration purposes only and is a personal project of @nasanierunatto. Some features are under development and it is uncertain to receive future updates. Still, thank you for visiting and using this website.</p>
      <hr />
      <p className='mb-2'>{updateNote}</p>
      {changes ? (
        <ul>
          {
            changes.map((change) => (
              <li>{change}</li>
            ))
          }
        </ul>
      ) : 'No information from the developer.'}
    </Alert>
  )
}

export default UpdateNotice