import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import {Field, reduxForm, reset} from 'redux-form'
import textDescription from '../../../common/form/textDescription';

class PhotoDetailedChatForm extends Component {
    handleCommentSubmit = values => {
        const {addPhotoComment, reset, photoId, closeForm, parentId} = this.props;
        addPhotoComment(photoId, values, parentId);
        reset();
        if (parentId !== 0) {
            closeForm();
        }
    }
  render() {
    return (
        <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
          <Field name='comment' type='text' component={textDescription} rows={2}/>
          <Button
            content='Add Reply'
            labelPosition='left'
            icon='edit'
            primary
          />
        </Form>
    )
  }
}

export default reduxForm({Fields: 'comment'})(PhotoDetailedChatForm)