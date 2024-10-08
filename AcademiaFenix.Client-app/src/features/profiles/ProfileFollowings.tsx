import { Card, Grid, Header, Tab } from 'semantic-ui-react'

import ProfileCard from './ProfileCard';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

function ProfileFollowings() {
    const { profileStore } = useStore();
    const { profile, followings, loadingFollowings, activeTab } = profileStore;

    return (
        <Tab.Pane
            loading={loadingFollowings}>
            <Grid>
                <Grid.Column
                    width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={activeTab === 3 ? `People following ${profile?.displayName}:` : `People ${profile?.displayName} is following:`}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Card.Group itemsPerRow={4}>
                        {
                            followings.map((profile) => (
                                <ProfileCard
                                    key={profile.userName}
                                    profile={profile}
                                />
                            ))
                        }
                    </Card.Group>
                </Grid.Column>

            </Grid>

        </Tab.Pane>
    )
}

export default observer(ProfileFollowings)