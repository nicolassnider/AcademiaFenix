import * as Yup from 'yup';

import { Button, Header } from 'semantic-ui-react'
import { ErrorMessage, Form, Formik } from 'formik'

import MyTextInput from '../../app/common/form/MyTextInput'
import ValidationError from '../errors/ValidationError';
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

function RegisterForm() {
    const { userStore } = useStore()
    return (

        <Formik
            initialValues={{
                displayName: '',
                userName: '',
                email: '',
                password: '',
                image: '',
                error: null
            }}
            onSubmit={(values, { setErrors }) => userStore
                .register(values)
                .catch(error => setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),               

            })}
        >

            {({ handleSubmit, isSubmitting, errors, isValid  }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextInput placeholder='Username' name='userName' />
                    <MyTextInput placeholder='Email' name='email' type='email' />
                    <MyTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage
                        name='error'
                        render={() =>
                            <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid}
                        loading={isSubmitting}
                        positive
                        content='Register'
                        type='submit'
                        fluid />
                </Form>
            )}

        </ Formik>
    )
}

export default observer(RegisterForm)