import { Divider, Grid, Header, Item, Segment, Statistic, } from "semantic-ui-react";

import FollowButton from "./FollowButton";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface Props {
    profile: Profile
}
function ProfileHeader({ profile }: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column
                    width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image
                                avatar
                                size="small"
                                src={profile.image || "/assets/user.png"} />
                            <Item.Content
                                verticalAlign="middle">
                                <Header
                                    as={'h1'}
                                    content={profile.displayName || 'Displayname'} />

                            </Item.Content>

                        </Item>

                    </Item.Group>

                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton
                        profile={profile} />

                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(ProfileHeader)