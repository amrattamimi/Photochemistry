import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field,reduxForm } from 'redux-form';
import textInput from '../../../common/form/textInput';
import { login } from './Register/authActions';
import { connect } from 'react-redux';


const mapDispatchToProps={
  login
}


const LoginForm = ({login, handleSubmit,error} ) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={textInput}
          type="text"
          placeholder="Email"
        />
        <Field
          name="password"
          component={textInput}
          type="password"
          placeholder="password"
        />
        {/* catching error from submission error from auth reducer  */}
        {error&&<Label basic>{error}</Label>}
        <Button fluid color="facebook">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(null, mapDispatchToProps) (reduxForm ({form:'loginForm'})(LoginForm));