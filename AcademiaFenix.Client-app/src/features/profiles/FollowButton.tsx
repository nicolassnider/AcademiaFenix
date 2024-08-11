import { Button, Reveal } from 'semantic-ui-react'

import { Profile } from '../../app/models/profile'
import { SyntheticEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

interface Props {
    profile: Profile
}

function FollowButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    if (userStore.user?.userName === profile.userName) return null;
    return (
        <Reveal animated='move'>
            <Reveal.Content
                visible
                style={{ width: '100%' }}>
                <Button
                    fluid
                    color="teal"
                    content={profile.following ? 'Following' : 'Not following'} />

            </Reveal.Content>
            <Reveal.Content
                hidden
                style={{ width: '100%' }}>
                <Button
                    fluid
                    basic
                    color={profile.following ? 'red' : 'green'}
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading}
                    onClick={(e) => handleFollow(e, profile.userName)} />

            </Reveal.Content>

        </Reveal>
    )
}

export default observer(FollowButton)