import { Grid, Loader } from 'semantic-ui-react'
import { useEffect, useState } from 'react'

import StudentFilters from './StudentFilters'
import ActivityList from './StudentList'
import SudentListItemPlaceholder from './StudentListItemPlaceholder'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { PagingParams } from '../../../app/models/pagination'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

function StudentDashboard() {
    const { studentStore } = useStore();
    const { loadStudents, studentRegistry, setPagingParams, pagination } = studentStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadStudents().then(() => setLoadingNext(false));
    }


    useEffect(() => {
        if (studentRegistry.size <= 1) {
            loadStudents();
        }
    }, [studentRegistry.size, loadStudents]);


    if (studentStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading students...' />;
    return (
        <Grid>
            <Grid.Column width={10}>
                {
                studentStore.loadingInitial 
                && studentRegistry.size===0 
                && !loadingNext
                    ? (<>
                        <SudentListItemPlaceholder />
                        <SudentListItemPlaceholder />
                    </>)
                    : (<InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>)}


            </Grid.Column>
            <Grid.Column width={6}>
                <StudentFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader
                    active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(StudentDashboard); 