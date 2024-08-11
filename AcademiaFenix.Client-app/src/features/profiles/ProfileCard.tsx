import { Card, Icon, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Profile } from "../../app/models/profile"
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}
function ProfileCard({ profile }: Props) {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + '...' : str;
    }
  }
  return (
    <Card
      as={Link}
      to={`/profiles/${profile.userName}`}>
      <Image
        src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>
          {profile.displayName}
        </Card.Header>
        <Card.Description>
          {truncate(profile.bio) || 'No bio'}
        </Card.Description>
      </Card.Content>
      <Card.Content
        extra>
        <Icon
          name='user'
        />
        {profile.followersCount || 0} followers

      </Card.Content>

    </Card>
  )
}

export default observer(ProfileCard)