


import React, { Component } from "react";
import {
  Form,
  Segment,
  Button,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createPhoto, updatePhoto } from "../galleryList/galleryActions";
import {  Field, reduxForm } from "redux-form";
import textInput from "../../../common/form/textInput";
import textDescription from "../../../common/form/textDescription";
import selectIput from "../../../common/form/selectIput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import dateInput from "../../../common/form/dateInput";
import { withFirestore } from "react-redux-firebase";
import { uploadProfileImage2 } from "../user/Settings/Photos/uploadActions";

// import { storage } from "../../../config/firebase";

const mapStateToPropsData = (state, ownProps) => {
  const photoID = ownProps.match.params.id;

  let photo = {};
  if(state.firestore.ordered.photos && state.firestore.ordered.photos.length>0){
    photo= state.firestore.ordered.photos.filter(photo=> photo.id===photoID)[0] ||{};
  }
  return {
    initialValues: photo,
  };
};

const mapDispatchToProps = {
  createPhoto,
  updatePhoto,
  uploadProfileImage2
  
};




const category = [
  { key: "contemporary", text: "Contemporary", value: "contemporary" },
  { key: "minimalistic", text: "Minimalistic", value: "minimalistic" },
  { key: "classic", text: "Classic", value: "classic" },
  { key: "black&white", text: "Black & White", value: "black & white" },
  { key: "postModern", text: "Post Modern", value: "post modern" },
];

const validate = combineValidators({
  title: isRequired({ message: "the title is required" }),
  category: isRequired({ message: "category is reuiqred" }),
  description: composeValidators(
    isRequired({ message: "description is required" }),
    hasLengthGreaterThan(4)({ message: "description is too short" })
  )(),
  location: isRequired({ message: "the city is required" }),
  editions: isRequired("venue"),
  date: isRequired({ message: "date is required" }),
});

class GalleryForm extends Component {
  state={
    selectedFile:null
  }

  
  // state={ ...this.props.photo }

  // componentDidMount(){
  //   if(this.props.selectedPhoto !==null){
  //     this.setState({
  //       ...this.props.selectedPhoto
  //     })
  //   }

  // }

  // async componentDidMount(){
  //   const {firestore,match,history}=this.props;
  //   let photo = await firestore.get(`photos/${match.params.id}`);
  //   if(!photo.exists) {
  //     history.push('/gallery')
  //   }
  // }

  handleUpload = async (file)=>{
    this.setState({
      selectedFile:file.target.files[0]
    })

  }
  

  handleFormSubmit = async (values) => {
    console.log (values)
    try {
      if (this.props.initialValues.id) {
        this.props.updatePhoto(values);
        this.props.history.push(`/gallery/${this.props.initialValues.id}`);

      } else {
        let createdPhoto = await this.props.createPhoto(values);
         await this.props.uploadProfileImage2(this.state.selectedFile,createdPhoto.id)
        this.props.history.push(`/gallery/${createdPhoto.id}`);
        
      }
    } catch (error) {}
  };

  // fileSelectHandler=event=>{
  //   this.setState({
  //     selectedFile: event.target.files[0]

  //   })
  //   console.log(event.target.files[0])
     
  //   this.props.uploadProfileImage(event.target.files[0])
    

  // }


  

  render() {

    // const {title, date, location, description, takenBy }= this.state;
    const {
    
      history,
      initialValues,
      submitting,
      invalid,
      pristine,
    } = this.props;

    return (
      <Segment>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Header
            sub
            color='black'
            content='Please provide the following information:'
          />
          <Field name='title' component={textInput} placeholder='Image title' />
          <Field
            name='date'
            component={dateInput}
            dateFormat='dd LLL yyyy h:mm a'
            showTimeSelect
            timeFormat='HH:mm'
            placeholder='When was the picture taken'
          />
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
            placeholder='what are the available editions?'
          />
{/* 
           <Label>upload your file </Label>
                <input type="file"
                 onChange={  this.fileSelectHandler}/> */}

          {/* <Field
            type='file'
            onChange={this.fileSelectHandler}
            component={uploadInput}
            placeholder='what are the available editions?'
          /> */}
          {/* start segment */}

          <Segment>
          

          <input type="file" onChange={this.handleUpload}/>
            
         
          </Segment>

          <Button
            disabled={invalid || pristine || submitting}
            positive
            type='submit'
          >
            Submit
          </Button>

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

export default withFirestore (connect(
  mapStateToPropsData,
  mapDispatchToProps
)(reduxForm({ form: "galleryForm", validate,enableReinitialize:true })(GalleryForm)));