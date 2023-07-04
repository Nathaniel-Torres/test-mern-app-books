import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

function UpdateNotice() {
  const githubRepo = '#'
  const updateNote = 'Last updated: 7/4/2023 7:58AM GMT+8'
  const changes = [
    'Login UI redesign'
  ]

  return (
    <Alert variant='info' className='mt-4' data-bs-theme='dark'>
      <Alert.Heading>
        <Container><i className='bi bi-bell-fill'></i>&nbsp;&nbsp;Notice:</Container>
      </Alert.Heading>
      <Container>
        <p>Due to internet traffic, users maybe unable to login temporarily. If you encountered this problem, please try again later.</p>
      
      <hr />
      <p className='mb-2'>{updateNote}</p>
      {changes ? (
        <ul>
          {
            changes.map((change) => (
              <li key={change}>{change}</li>
            ))
          }
        </ul>
      ) : 'No information from the developer.'}
      </Container>
    </Alert>
  )
}

export default UpdateNotice