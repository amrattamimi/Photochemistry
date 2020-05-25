import React from 'react';
import { Button, Divider, Form, Header, Segment, TextArea } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import selectIput from '../../../../common/form/selectIput';
import textInput from '../../../../common/form/textInput';

const interests = [ //passing down the options of of interest to the interest field input 
  { key: 'reading', text: 'Reading', value: 'reading' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'travelling', text: 'Travelling', value: 'travelling' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'museum', text: 'Museum', value: 'museum' },
  { key: 'cinema', text: 'Cinema', value: 'cinema' }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment style={{margin:"40px"}}>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={selectIput} //importing the select input component 
          options={interests}
          value="interests"
          multiple={true}
          placeholder="Select your interests"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={textInput}
          placeholder="Occupation"
        />
        <Field
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={textInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
      </Form>
    </Segment>
  );
};

export default reduxForm({ form: 'userProfile', enableReinitialize: true , destroyOnUnmount:false})(AboutPage);