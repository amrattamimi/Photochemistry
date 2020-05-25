import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

//source of the code https://github.com/roadmanfong/react-cropper

class CropperInput extends Component {
  cropImage = () => {
      const {setImage, setCropResult} = this.props;
      if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {//if the cropped canvas is unidentfied return nothing 
          return;
      }

      this.refs.cropper.getCroppedCanvas().toBlob(blob => {
          setCropResult(URL.createObjectURL(blob));
          setImage(blob)
      }, 'image/jpeg')// storing the image as a blob in firestore storage 
  };

  render() {
    const { imagePreview } = this.props; //the image preview from photos page 
    return (
      <Cropper //styling the cropper 
        ref='cropper'
        src={imagePreview}
        style={{ height: 200, width: '100%' }}
        aspectRatio={1}
        viewMode={0}
        dragMode='move'
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export default CropperInput;