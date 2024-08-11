import { Card, Grid, Header, Image, Tab, TabProps } from 'semantic-ui-react';
import { SyntheticEvent, useEffect } from 'react'

import { Link } from 'react-router-dom';
import { Userstudent } from '../../app/models/profile';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

function ProfileActivities() {
    const panes = [
        {
            menuItem: 'Future Events',
            pane: { key: 'future' }
        },
        {
            menuItem: 'Past Events',
            pane: { key: 'past' }
        },
        {
            menuItem: 'Hosting',
            pane: { key: 'hosting' }
        },
    ]
    const { profileStore } = useStore();
    const { loadUserStudents: loadUserActivities, profile, loadingStudents: loadingActivities, userStudent: userActivities } = profileStore;
    useEffect(() => {
        loadUserActivities(profile!.userName)
    }, [loadUserActivities, profile])


    const handleTabChange = (_: SyntheticEvent, data: TabProps) => {

        loadUserActivities(profile!.userName, panes[data.activeIndex as number].pane.key);
    }

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='calendar'
                        content={'Activities'} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)} />
                    <br />
                    <Card.Group
                        itemsPerRow={4}>
                        {userActivities.map((activity: Userstudent) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}>
                                <Image
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }} />
                                <Card.Content>
                                    <Card.Header
                                        textAlign='center'
                                        content={activity.title} />
                                    <Card.Meta
                                        textAlign='center'>
                                        <div>
                                            {format(new Date(activity.date), 'do LLL')}
                                        </div>
                                        <div>
                                            {format(new Date(activity.date), 'h:mm a')}
                                        </div>

                                    </Card.Meta>

                                </Card.Content>

                            </Card>
                        ))}

                    </Card.Group>

                </Grid.Column>

            </Grid>

        </Tab.Pane>
    )
}

export default observer(ProfileActivities)