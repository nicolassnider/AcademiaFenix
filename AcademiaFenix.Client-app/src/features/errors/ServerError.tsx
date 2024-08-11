import { Container, Header, Segment } from 'semantic-ui-react'

import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

function ServerError() {
    const { commonStore } = useStore()
    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {commonStore.error && (
                <Segment>
                    <Header as='h4' content='Stack trace' color='teal' />
                    <code style={{ marginTop: '10px' }}>
                        {commonStore.error.details}
                        {commonStore.error.message}
                        {commonStore.error.statusCode} 
                    </code>
                </Segment>
            )}
        </Container>
    )
}

export default observer(ServerError) 