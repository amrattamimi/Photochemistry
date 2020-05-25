import React from 'react'
import { Form,Label,Select } from 'semantic-ui-react'

   //Form field returns an error if the field is touched and an error was made
    // a check if the field is touched or error occured 
    //passing down redux props to the component
    //code used is with the help of an online tutorial 

const selectIput = ({input, placeholder, multiple,options, meta:{touched,error}}) => {
    return (
        <Form.Field error={touched && !!error }>
            <Select
            value={input.value ||null }
            onChange={(e,data)=> input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
            multiple={multiple}
            />
            {touched &&error && <Label basic color='red'>{error}</Label>}

        </Form.Field>
    )
}

export default selectIput
