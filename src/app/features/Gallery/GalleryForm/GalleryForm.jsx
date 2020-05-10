import React, { Component } from 'react'
import { Input, Form, Segment, Button } from 'semantic-ui-react'

 class GalleryForm extends Component {



  state={
    title:'',
    date:'',
    location:'',
    description:'',
    takenBy:''
  }

  componentDidMount(){
    if(this.props.selectedPhoto !==null){
      this.setState({
        ...this.props.selectedPhoto
      })
    }

  }
 



  handleFormSubmit= input=>{
    input.preventDefault();
    console.log(this.state);
    if(this.state.id){
      this.props.updatePhoto(this.state)
    }else{
    this.props.createPhoto(this.state);
    }
    
  }

 

  handleInputChange =({target:{name,value}})=>{
    this.setState({
    [name]:value
  })}

    render() {
      const {title, date, location, description, takenBy }= this.state;

        return (
                  <Segment>
                    <Form onSubmit={this.handleFormSubmit}>
                      
                      <Form.Field>
                        <label>Photo Title</label>
                        <input 
                        name="title"
                        placeholder="Location the photo was taken"
                        onChange={this.handleInputChange} 
                        value={title}/>
                      </Form.Field>
                      
                      
                      <Form.Field>
                        <label>Photo Date</label>
                        <Input
                        name="date" 
                        type="date" placeholder="Event Date"
                        onChange={this.handleInputChange}
                        value={date} />
                      </Form.Field>
                      <Form.Field>
                        <label>Location</label>
                        <input name="location"
                        placeholder="Location the photo was taken"
                        onChange={this.handleInputChange} 
                        value={location}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Description</label>
                        <input name="description"
                        placeholder="Enter the description here" 
                        onChange={this.handleInputChange}
                        value={description}/>
                      </Form.Field>
                      <Form.Field>
                        <label>Taken by</label>
                        <input name="takenBy"
                        placeholder="put the name of the photographer " 
                        onChange={this.handleInputChange}
                        value={takenBy}/>
                      </Form.Field>
                      <Button positive type="submit">
                        Submit
                      </Button>
                      <Button onClick={this.props.cancelForm} type="button">Cancel</Button>
                    </Form>
                  </Segment>
        )
    }
  }

export default GalleryForm;
