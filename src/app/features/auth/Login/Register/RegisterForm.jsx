import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field,reduxForm } from 'redux-form';
import textInput from '../../../../common/form/textInput';
import { connect } from 'react-redux'; // importing to connect the form to the store 
import { registerUser } from './authActions';
import { combineValidators, isRequired } from 'revalidate';

//passing down an action 
const mapDispatchToProps={
  registerUser
}

// validate inputs with redux form validator 
const validate= combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

const RegisterForm = ({handleSubmit,registerUser,invalid,error,submitting }) => {
  return (
    // Passing the data of the form to the submit handler to hook it up with the auth actions register user  
      <Form size="large" onSubmit={handleSubmit(registerUser)}> 
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={textInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={textInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={textInput}
            placeholder="Password"
          />
          {error& <Label basic color='red'>{error}</Label>}
          <Button disabled ={invalid ||submitting} fluid color="facebook">
            Register
          </Button>
        </Segment>
      </Form>
  );
};

export default connect(null,mapDispatchToProps) (reduxForm ({form:'registerForm',validate})(RegisterForm));