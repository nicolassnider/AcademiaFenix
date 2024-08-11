import { Header, Item, Segment } from 'semantic-ui-react';

import StudentListItem from './StudentListItem';
import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

export default observer(function StudentList() {

  const { studentStore } = useStore();
  const { groupedStudents } = studentStore;

  return (
    <Segment>
      <Item.Group divided>
        {groupedStudents.map(([group, students]) => (
          <Fragment key={group}>
            <Header sub color='teal'>
              {group}

            </Header>
            <Segment>
              <Item.Group divided>
                {students.map(student => (<StudentListItem key={student.id} student={student} />))}
              </Item.Group>
            </Segment>

          </Fragment>
        ))}

      </Item.Group>
    </Segment>

  );
});
