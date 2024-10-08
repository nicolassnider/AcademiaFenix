import { Profile } from '../../app/models/profile'
import ProfileAbout from './ProfileAbout'
import ProfileActivities from './ProfileActivities'
import ProfileFollowings from './ProfileFollowings'
import ProfilePhotos from './ProfilePhotos'
import { Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'

interface Props {
    profile: Profile
}

function ProfileContent({ profile }: Props) {
    const { profileStore } = useStore();
    const { setActiveTab } = profileStore;
    const panes = [
        {
            menuItem: 'About',
            render: () => <ProfileAbout /> //Note that since we are getting the profile directly from the store we do not need to pass down the profile here.
        },
        {
            menuItem: 'Photos',
            render: () => <ProfilePhotos profile={profile} />
        },
        {
            menuItem: 'Events',
            render: () => <ProfileActivities/>
        },
        {
            menuItem: 'Followers',
            render: () => <ProfileFollowings />
        },
        {
            menuItem: 'Following',
            render: () => <ProfileFollowings />
        },

    ]
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
        />
    )
}

export default ProfileContent