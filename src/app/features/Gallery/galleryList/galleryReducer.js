import { createReducer } from "../../../common/utils/reducerUtils"
import { CREATE_PHOTO, DELETE_PHOTO, UPDATE_PHOTO, LIKE_PHOTO, FETCH } from "./galleryConstants"

const initialState = []

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

  const fetch = (state, payload) => {
    return [
       ...payload.photos
    ]
  }


  export default createReducer(initialState,{
      [CREATE_PHOTO]: createPhoto,
      [DELETE_PHOTO]: deletePhoto,
      [UPDATE_PHOTO]: updatePhoto,
      [LIKE_PHOTO]:likePhoto,
      [FETCH]: fetch

  })

