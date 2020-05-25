import React from 'react'
import { Form, Label, } from 'semantic-ui-react'

//Form field returns an error if the field is touched and an error was made
    // a check if the field is touched or error occured 
    //passing down redux props to the component
    //code used is with the help of an online tutorial 

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
