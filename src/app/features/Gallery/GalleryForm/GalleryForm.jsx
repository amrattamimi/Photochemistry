import React, { Component } from "react";
import { Form, Segment, Button, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createPhoto, updatePhoto } from "../galleryList/galleryActions";
import { Field, reduxForm } from "redux-form";
import textInput from "../../../common/form/textInput";
import textDescription from "../../../common/form/textDescription";
import selectIput from "../../../common/form/selectIput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  isNumeric,
} from "revalidate";
import { withFirestore } from "react-redux-firebase";
import { uploadPostPhoto } from "../user/Settings/Photos/uploadActions";


const mapStateToPropsData = (state, ownProps) => {
  const photoID = ownProps.match.params.id;

  let photo = {};
  if (
    state.firestore.ordered.photos &&
    state.firestore.ordered.photos.length > 0
  ) {
    photo =
      state.firestore.ordered.photos.filter(
        (photo) => photo.id === photoID
      )[0] || {};
  }
  return {
    initialValues: photo,
  };
};

const mapDispatchToProps = {
  createPhoto,
  updatePhoto,
  uploadPostPhoto,
};

const category = [
  // categories available for the input
  { key: "contemporary", text: "Contemporary", value: "contemporary" },
  { key: "minimalistic", text: "Minimalistic", value: "minimalistic" },
  { key: "conceptual", text: "Conceptual", value: "conceptual" },
  { key: "classic", text: "Classic", value: "classic" },
  { key: "black&white", text: "Black & White", value: "black & white" },
  { key: "postModern", text: "Post Modern", value: "post modern" },
  { key: "other", text: "Other", value: "other" },
];

// composing several validators into one field 
//allowing the validation of multiple fields at once 
const validate = combineValidators({
  title: isRequired({ message: "the title is required" }),
  category: isRequired({ message: "category is reuiqred" }),
  editions: composeValidators(
    isRequired("editions"),
    isNumeric({ message: "this should be a number" })
  )(),
  description:isRequired({ message: "description is required" }),
  location: isRequired({ message: "the city is required" }),
 
});

class GalleryForm extends Component {
  state = {
    selectedFile: null,
  };

  handleUpload = async (file) => {
    this.setState({
      selectedFile: file.target.files[0],
    });
  };


  handleFormSubmit = async (values) => {
    try {
      if (this.props.initialValues.id) {
        this.props.updatePhoto(values);
        this.props.history.push(`/gallery/${this.props.initialValues.id}`);
      } else {
        let createdPhoto = await this.props.createPhoto(values);
        await this.props.uploadPostPhoto(
          this.state.selectedFile,
          createdPhoto.id
        );
        this.props.history.push(`/gallery/${createdPhoto.id}`);
      }
    } catch (error) {}
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      pristine,
      submitting      
    } = this.props;

    return (
      <Segment>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          {!initialValues.id && ( //existing posts cannot change photo
            <Segment>
              <Header sub color='black' content='Choose an image to upload' />
              <input type='file' onChange={this.handleUpload} />
            </Segment>
          )}
       
          <Header
            sub
            color='black'
            content='Please provide the following information:'
          />
          <Field name='title' component={textInput} placeholder='Image title' />

          <Field
            name='location'
            component={textInput}
            placeholder='Where was it taken?'
          />
          <Field
            name='description'
            component={textDescription}
            rows={9}
            placeholder='Provide description for your art'
          />
          <Field
            name='category'
            component={selectIput}
            multiple={true}
            options={category}
            placeholder='choose some of those categories?'
          />
          <Field
            name='editions'
            component={textInput}
            placeholder='How many editions available?'
          />

          

          <Button
            disabled={pristine || invalid ||  submitting}
            positive
            type='submit'
          >
            Submit
          </Button>
           {/* the button will redirect the user to the gallery or to photo dispaly page */}
          <Button
            onClick={
              initialValues.id
                ? () => history.push(`/gallery/${initialValues.id}`)
                : () => history.push("/gallery")
            }
            type='button'
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default withFirestore(
  connect(
    mapStateToPropsData,
    mapDispatchToProps
  )(
    reduxForm({ form: "galleryForm", validate, enableReinitialize: true })(
      GalleryForm
    )
  )
);
