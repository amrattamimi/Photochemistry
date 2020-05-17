import { createReducer } from "../../../common/utils/reducerUtils"
import { CREATE_PHOTO, DELETE_PHOTO, UPDATE_PHOTO, LIKE_PHOTO } from "./galleryConstants"

const initialState = [
    {
      id: '1',
      title: 'Trip to Holland ',
      date: '2018-03-27',
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
      date: '2018-03-27',
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

  const createPhoto= (state,payload) =>{
     
    return  [...state, payload.photo]

  }

 

  const deletePhoto = (state,payload)=>{
      return[...state.filter(photo=>photo.id!==payload.photoID)]
  }

  const updatePhoto=(state,payload)=>{
    return [
      ...state.filter(photo=>photo.id !== payload.photo.id),payload.photo
    ]
  }

  const likePhoto=(state,payload)=>{
    return [
      ...state.filter(photo=>photo.likedBy.id !== payload.photo.likedByid),payload.photo.likedBy
    ]
  }


  export default createReducer(initialState,{
      [CREATE_PHOTO]: createPhoto,
      [DELETE_PHOTO]: deletePhoto,
      [UPDATE_PHOTO]: updatePhoto,
      [LIKE_PHOTO]:likePhoto

  })

