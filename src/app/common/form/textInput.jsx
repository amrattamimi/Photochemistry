import React from 'react'
import { Form, Label} from 'semantic-ui-react'

const textInput = ({
    input,
    width,
    type,
    placeholder,
    meta:{touched,error}
}) => {
       //Form field returns an error if the field is touched and an error was made
    //spreading the input field and pass downt the place holder 
    // a check if the field is touched or error occured 
    //code used is with the help of an online tutorial 
    return (
        <Form.Field error={touched &&!!error }>
            <input {...input} placeholder={placeholder} type={type}/>
            {touched &&error && <Label basic color='red'>{error}</Label>}

        </Form.Field>
       
    )
}

export default textInput
