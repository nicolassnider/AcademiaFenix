import { Button, Header, Icon, Segment } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Segment>
        <Header icon>
            <Icon name='search' />
            Oops - we've looked everywhere and could not find this.
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/students' primary>
                Return to students page
            </Button>
        </Segment.Inline>
    </Segment>
  )
}

export default NotFound