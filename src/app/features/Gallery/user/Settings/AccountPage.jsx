import React from 'react';
import { Segment, Header, Form, Divider, Label, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import textInput from '../../../../common/form/textInput';
import { combineValidators, isRequired, composeValidators,matchesField } from 'revalidate';




const validate= combineValidators({ // using validator from redux forms
  newPassword1: isRequired({message:'Enter your password '}),
  newPassword2 :composeValidators(
  isRequired({message: 'Please confirm your new password '}),
   matchesField ('newPassword1')({message:'passwords do not match'}) //only validate when both fields are the same 
)()
})

const AccountPage = ({ error, invalid, submitting,handleSubmit, updatePassword }) => {
  return (
    <Segment style={{margin:"40px"}}>
      <Header dividing size="large" content="Account" />
      <div>
        <Header color="facebook" sub content="Change password" />
        <p>Use this form to update your account settings</p>
        {/* passing the form information to updatepassword function in the reducer  */}
        <Form onSubmit={handleSubmit(updatePassword)}>  
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={textInput}
            basic={true}
            placeholder="New Password"
          />
          <Field
            width={8}
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={textInput}
            placeholder="Confirm Password"
          />
          {error && (
            <Label basic>
              {error}
            </Label>
          )}
          <Divider />
           
          <Button disabled={invalid ||submitting } size="large" positive content="Update Password" />
        </Form>
      </div>

    </Segment>
  );
};

export default reduxForm({ form: 'account', validate })(AccountPage);