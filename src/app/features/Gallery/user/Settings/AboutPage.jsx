import React from 'react';
import { Button, Divider, Form, Header, Segment, TextArea } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import selectIput from '../../../../common/form/selectIput';
import textInput from '../../../../common/form/textInput';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name="about" component={TextArea} placeholder="About Me" />
        <Field
          name="interests"
          component={selectIput}
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