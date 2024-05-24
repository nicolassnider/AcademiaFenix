import { Icon, Item, Label, Segment } from 'semantic-ui-react';

import { Student } from '../../../app/models/student';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
	student: Student;
}
function ActivityListItem({ student }: Props) {
	return (
		<Segment.Group>
			<Segment>
				{student.IsBlackBelt && (
					<Label
						attached="top"
						color="red"
						content="Is Black Belt"
						style={{
							textAlign: 'center',
						}}
					/>
				)}
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Header
								as={Link}
								to={`/activities/${student.Id}`}
							>
								{student.Name}
							</Item.Header>
							<Item.Description>
								<Label
									basic
									color="green"
									content={student.Email}
								/>
							</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" />
					{format(student.TrainingStartDate!, 'dd MMM yyyy')}
					<Icon mame="marker" />
				</span>
			</Segment>
		</Segment.Group>
	);
}

export default ActivityListItem;
