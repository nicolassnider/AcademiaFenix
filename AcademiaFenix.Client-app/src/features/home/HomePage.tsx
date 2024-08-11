import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store'

function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment
      inverted
      textAlign='center'
      vertical
      className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }} />
          Academia Fenix
        </Header>
        {userStore.isLoggedIn
          ? (
            <>
              <Header
                as='h2'
                inverted
                content={`Welcome back ${userStore.user?.displayName}`} />
              <Button
                as={Link}
                to='/students'
                size='huge'
                inverted>
                Check out Sudents!
              </Button>
            </>)
          : (
            <>
              <Header
                as='h2'
                inverted
                content='Welcome to Academia Fenix' />
              <Button
                onClick={() => modalStore.openModal(<RegisterForm />)}
                size='huge'
                inverted>
                Register
              </Button>
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size='huge'
                inverted>
                Login
              </Button>
            </>)
        }

      </Container>

    </Segment>
  )
}

export default observer(HomePage)