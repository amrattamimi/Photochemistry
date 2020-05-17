import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import textInput from '../../../../common/form/textInput';
import dateInput from '../../../../common/form/dateInput';
import { addYears } from 'date-fns';

class BasicPage extends Component {

    render() {
        const {pristine, submitting, handleSubmit, updateProfile} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={textInput}
                        placeholder='Known As'
                    />
                
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={dateInput}
                        placeholder='Date of Birth'
                        dateFormat='dd LLL yyyy'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode= 'select' 
                        maxDate={addYears(new Date(), -18 )}
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        label='Female'
                        component={textInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}
//connecting redux form, enabling reinitiliase and destroy on unmout for the data not to be lost in the form
export default reduxForm({form: 'userProfile', enableReinitialize:true,destroyOnUnmount:false})(BasicPage);