import ActivityDetailedChat from './StudentDetailedChat';
import ActivityDetailedHeader from './StudentDetailedHeader';
import ActivityDetailedInfo from './StudentDetailedInfo';
import ActivityDetailedSidebar from './StudentDetailedSidebar';
import {
    Grid
} from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store'

function ActivityDetails() {
    const { studentStore: activityStore } = useStore();
    const { selectedStudent: activity, loadStudent: loadActivity, loadingInitial, clearSelectedStudent: clearSelectedActivity } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
        return ()=> clearSelectedActivity();
    }, [id, loadActivity,clearSelectedActivity])

    if (loadingInitial || !activity) return <LoadingComponent />;
    return (
        <Grid>
            <Grid.Column
                width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat activityId={activity.id} />
            </Grid.Column>
            <Grid.Column
                width={6}>
                <ActivityDetailedSidebar activity={activity} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)

