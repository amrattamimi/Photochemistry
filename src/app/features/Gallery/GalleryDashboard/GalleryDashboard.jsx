import React, { Component, Fragment } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import GalleryList from '../galleryList/GalleryList'
import GalleryForm from '../GalleryForm/GalleryForm'
import cuid from 'cuid'


const photosFromDashboard = [
  {
    id: '1',
    title: 'Trip to Holland ',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    likes: '3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    location: 'London, UK',
    takenBy: 'Bob',
    photoURL: 'https://3.bp.blogspot.com/-HMlpPs_I27g/WUu9PaCx_mI/AAAAAAAABfc/i5ZvwQsJlTELFEDowEH2vJQB81xn7scPACLcBGAs/s1600/A%2BMyth%2B-%2Bweb.jpg',
    likedBy: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },{
    id: '2',
    title: 'Trip to france ',
    date: '2018-03-27T11:00:00+00:00',
    category: 'landscape',
    likes:'34',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    location: 'London, UK',
    takenBy: 'Bob',
    photoURL: 'https://1.bp.blogspot.com/-fic3-M4ACMo/Xi0zKhHyc-I/AAAAAAAADQg/FKmEp2ODl3ku5KnjYVmgOFQJVFnZ8FauwCLcBGAsYHQ/s1600/capcised.jpg',
    likedBy: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
]


 class GalleryDashboard extends Component {

   state ={
    photos: photosFromDashboard,
    isopen:false,
    selectedPhoto:null
  }
  

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };
  



  

  handleCreatePhoto =newPhoto=>{
    newPhoto.id=cuid();
    newPhoto.photoURL='http://2.bp.blogspot.com/-f7EUxANsah4/V5--A7KJ05I/AAAAAAAAAQg/sOhGYaEbEncYa04-_wkOl8mAzdPtSBS5wCK4B/s1600/moerae%2B%2Bs.jpg'
    this.setState(({photos}) =>({
      photos: [...photos,newPhoto],
      isOpen: false
      
  }))
}

handleCreateFormOpen = () => {
  this.setState({
    isOpen: true,
    selectedEvent: null
  });
};

handleSelectPhoto = photo => {
  console.log(photo);
  this.setState({
    selectedPhoto: photo,
    isOpen:true
  });
};

handleUpdatedPhoto =updatedPhoto=>{
  this.setState(({photos})=>({
    photos:photos.map( photo=>{
      if(photo.id===updatedPhoto.id){
        return{...updatedPhoto}
      }else{
        return photo
      }

    }),
    isOpen:false,
    selectedPhoto:null

  }))
}

handleDeletePhoto =id=>{
  this.setState(({photos})=>({
    photos:photos.filter(photo=> photo.id !==id)

  }))
}

handleFormCancel = () => {
  this.setState({
    isOpen: false
  });
};

handleCreateFormOpen = () => {
  this.setState({
    isOpen: true,
    selectedEvent: null
  });
};

    render() {
      const {photos,selectedPhoto,isOpen}=this.state;
        return (
            <Fragment>
            <Grid>
             <GalleryList photos={photos} 
             selectPhoto={this.handleSelectPhoto}
             deletePhoto={this.handleDeletePhoto}/>
            </Grid>
            <Button onClick={this.handleCreateFormOpen}>create</Button>
            {isOpen&&(
            <GalleryForm
            key={selectedPhoto? selectedPhoto.id :0} 
            cancelForm={this.handleFormCancel}
            selectedPhoto={selectedPhoto}
            updatePhoto={this.handleUpdatedPhoto}
            createPhoto={this.handleCreatePhoto}/>
            
             ) }
             </Fragment>
        )
    }
}
export default GalleryDashboard