import React, { Component } from "react";
import { Label, Segment } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { uploadProfileImage } from "../../features/Gallery/user/Settings/Photos/uploadActions";

// const actions = {
//   uploadProfileImage,
// };

class uploadInput extends Component {
//   constructor(state) {
//     super(state);

//     this.state = {
//       selectedFile: null,
//     };
//   }

//   handleUpload(file) {
//     this.props.uploadProfileImage(file);
//   }

  fileSelect = (event) => {
    // this.handleUpload(event.target.files[0]);
  };

  render() {
    // const { input } = this.props;
    // delete input.value;

    return (
      <Segment>
        <Label>upload your file </Label>
        <input type='file'  />
        <div></div>
      </Segment>
    );
  }
}

export default uploadInput;
