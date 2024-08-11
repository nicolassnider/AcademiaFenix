import { Image, List, Popup } from 'semantic-ui-react'

import { IProfile } from '../../../app/models/profile'
import { Link } from 'react-router-dom'
import ProfileCard from '../../profiles/ProfileCard'
import { observer } from 'mobx-react-lite'

interface Props {
  attendees: IProfile[]
}

const StudentListItemAttendee = ({ attendees }: Props) => {
  const styles = {
    borderColor: 'orange',
    borderWidth: 3,
  }

  return (
    <List horizontal>
      {attendees.map(attendee => (
        <Popup
          hoverable
          key={attendee.userName}
          trigger={
            <List.Item
              as={Link}
              to={`/profiles/${attendee.userName}`}>
              <Image
                size='mini'
                circular
                src={attendee.image || '/assets/user.png'}
                bordered
                style={attendee.following ? styles : null} />
            </List.Item>}>
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>

      ))}
    </List>
  )
}

export default observer(StudentListItemAttendee)