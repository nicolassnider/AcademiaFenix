import * as Yup from 'yup';

import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

import { StudentFormValues } from '../../../app/models/student';
import { Formik } from 'formik';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { categoryOptions } from '../../../app/common/options/categoryOption';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';

function StudentForm() {
    const {  studentStore } = useStore();
    const {
        createStudent: createStudent,
        updateStudent: updateStudent,
        loading,
        loadStudent: loadStudent,
        loadingInitial } = studentStore;
    const { id } = useParams();
    const navigate = useNavigate();
    

    const [student, setStudent] = useState<StudentFormValues>(new StudentFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        venue: Yup.string().required(),
        city: Yup.string().required()

    })

    useEffect(() => {
        if (id) loadStudent(id).then(activity => setStudent(new StudentFormValues(activity)))
    }, [id, loadStudent])

    function handleFormSubmit(student: StudentFormValues) {
        if (!student.id) {
            const newStudent = {
                ...student,
                id: uuid()
            }
            createStudent(newStudent)
                .then(() => navigate(`/students/${newStudent.id}`))
        } else {
            updateStudent(student)
                .then(() => navigate(`/students/${student.id}`))
        }
    }
    /*function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }*/
    if (loadingInitial) {
        return (<LoadingComponent content='Loading student' />)
    }
    return (
        <Segment clearing>
            <Header content='Student Details' sub color='teal' />
            <Formik validationSchema={validationSchema}
                enableReinitialize
                initialValues={student}
                onSubmit={
                    values => handleFormSubmit(values)}>
                {
                    (({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='title' placeholder='Title' />

                            <MyTextArea rows={3} placeholder='Description' name='description' />
                            <MySelectInput options={[{ text: 'Select Category', value: 'select_category' }, ...categoryOptions]} placeholder='Category' name='category' />
                            <MyDateInput
                                placeholderText='date'
                                name='date'
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='MMMM d,yyyy h:mm aa' />
                            <Header content='Location details' sub color='teal' />
                            <MyTextInput placeholder='City' name='city' />
                            <MyTextInput placeholder='Venue' name='venue' />

                            <Button
                                as={Link}
                                to='/activities'
                                floated='right'
                                type='button'
                                content='Cancel' />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={loading}
                                floated='right'
                                positive
                                type='submit'
                                content='Submit'
                                primary />
                        </Form>
                    ))
                }

            </Formik>

        </Segment>
    )
}

export default observer(StudentForm)