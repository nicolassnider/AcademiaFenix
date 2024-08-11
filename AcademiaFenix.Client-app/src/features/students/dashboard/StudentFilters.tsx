import { Header, Menu } from 'semantic-ui-react'

import Calendar from 'react-calendar'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

function StudentFilters() {
    const { studentStore: { predicate, setPredicate } } = useStore();
    const ALL: string = 'all';
    const IS_GOING: string = 'isGoing';
    const IS_HOST: string = 'isHost';
    const STARTDATE: string = 'startDate'

    return (
        <>
            <Menu
                vertical
                size='large'
                style={{ width: '100%', marginTop: '25px' }}>
                <Header
                    icon='filter'
                    attached
                    color='teal'
                    content='Filters' />
                <Menu.Item
                    content='All Students'
                    active={predicate.has(ALL)}
                    onClick={() => setPredicate(ALL, 'true')} />
                <Menu.Item
                    content='I’m going'
                    active={predicate.has(IS_GOING)}
                    onClick={() => setPredicate(IS_GOING, 'true')} />
                <Menu.Item
                    content='I’m hosting'
                    active={predicate.has(IS_HOST)}
                    onClick={() => setPredicate(IS_HOST, 'true')} />
            </Menu>
            <Header />
            <Calendar
                onChange={(date) => setPredicate(STARTDATE, date as Date)}
                value={predicate.get(STARTDATE) || new Date()} />
        </>

    )
}

export default observer(StudentFilters)