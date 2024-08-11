import {
    Button,
    Icon,
    Item,
    Label,
    Segment
} from 'semantic-ui-react';

import { Student } from '../../../app/models/student';
import StudentListItemAttendee from './StudentListItemAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
    student: Student
}
function StudentListItem({ student: student }: Props) {
    return (
        <Segment.Group>
            <Segment>
                {
                    student.isCancelled &&
                    <Label
                        attached='top'
                        color='red'
                        content='Cancelled'
                        style={{
                            textAlign: 'center'
                        }}
                    />
                }
                <Item.Group>
                    <Item>
                        <Item.Image
                            style={{
                                marginBottom: 3
                            }}
                            size='tiny'
                            circular
                            src={student.host?.image ? student.host.image : '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header
                                as={Link}
                                to={`/students/${student.id}`}>
                                {student.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by <Link to={`/profiles/${student.hostUserName}`}>{student.hostUserName}</Link>

                            </Item.Description>
                            {student.isHost && (
                                <Item.Description>
                                    <Label
                                        basic
                                        color='orange'
                                        content='You are hosting this activity' />
                                </Item.Description>
                            )}
                            {student.isGoing && !student.isHost && (
                                <Item.Description>
                                    <Label
                                        basic
                                        color='green'
                                        content='You are going to this activity' />
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />
                    {format(student.date!, 'dd MMM yyyy')}
                    <Icon mame='marker' />

                    {student.venue}
                </span>
            </Segment>
            <Segment secondary>
                <StudentListItemAttendee attendees={student.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{student.description}</span>
                <Button
                    as={Link}
                    to={`/students/${student.id}`}
                    color='teal'
                    floated='right'
                    content='View' />
            </Segment>
        </Segment.Group>
    );


}

export default StudentListItem