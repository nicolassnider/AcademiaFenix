import { Grid } from "semantic-ui-react"
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store"

function ProfilePage() {
    const { userName } = useParams<{ userName: string }>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(userName!);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, userName, setActiveTab])

    if (loadingProfile)
        return <LoadingComponent content="Loading profile..." />


    return (
        <Grid>
            <Grid.Column
                width={16}>{
                    profile &&
                    <>
                        <ProfileHeader profile={profile!} />
                        <ProfileContent profile={profile!} />
                    </>

                }


            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage)