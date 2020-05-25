import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'

//dropzoneinput original code https://github.com/react-dropzone/react-dropzone

function DropzoneInput({setFiles}) {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file=> Object.assign(file,{
        preview: URL.createObjectURL(file) //creating an object of file in memeory to preview 
    })))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple:false,accept: 'image/*'})

  return (
    <div {...getRootProps()} className={'dropzone '+ (isDragActive && 'dropzone--isActive')}>
      <input {...getInputProps()} />
      <Icon name='long arrow alternate up' size='huge'/>
      <Header content='Drop image'/>

    </div>
  )
}


export default DropzoneInput;