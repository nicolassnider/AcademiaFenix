import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Form, Label } from 'semantic-ui-react'

import { useField } from 'formik';

function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!); /*This function is used to connect a form field to the Formik state*/
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value) || null)}
                onChange={value => helpers.setValue(value)} />

            {meta.touched && !!meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
    )
}

export default MyDateInput