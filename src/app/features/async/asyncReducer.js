import { createReducer } from "../../common/utils/reducerUtils"
import { ASYNC_START, ASYNC_FINISH, ASYNC_ERROR } from "./asyncConstants"

const initialState={
    loading:false
}


const asyncStart=state=>{
    return{
        ...state,
        loading:true
    }
}


const asyncFinish=state=>{
    return{
        ...state,
        loading:false
    }
}


const asyncError=state=>{
    return{
        ...state,
        loading:false
    }
}

export default createReducer (initialState,{
    [ASYNC_START]: asyncStart,
    [ASYNC_FINISH]:asyncFinish,
    [ASYNC_ERROR]:asyncError
})