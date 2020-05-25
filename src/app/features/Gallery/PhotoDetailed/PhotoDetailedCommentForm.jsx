import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form'
import textDescription from '../../../common/form/textDescription';

class PhotoDetailedCommentForm extends Component {
    handleCommentSubmit = values => { //passing the values to addphotocomment and closing the form
        const {addPhotoComment, reset, photoId } = this.props; //desctructring from props
        addPhotoComment(photoId, values);
        reset();
     
    }
  render() {
    return (
        <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
          <Field name='comment' type='text' component={textDescription} rows={3}/>
          <Button
            primary
            content="add a reply"
          />
        </Form>
    )
  }
}

export default reduxForm({Fields: 'comment'})(PhotoDetailedCommentForm)