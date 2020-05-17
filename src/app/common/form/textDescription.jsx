import React from 'react'
import { Form, Label, TextArea, } from 'semantic-ui-react'

const textDescription= ({
    input,
    width,
    rows,
    type,
    placeholder,
    meta:{touched,error}
}) => {
    return (
        <Form.Field error={touched &&!!error }>
            <textarea {...input} placeholder={placeholder} type={type} rows={rows}/>
            {touched &&error && <Label basic color='red'>{error}</Label>}

        </Form.Field>
       
    )
}

export default textDescription
