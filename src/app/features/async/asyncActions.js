import {ASYNC_START,  ASYNC_FINISH, ASYNC_ERROR } from './asyncConstants'

export const asyncStart =()=>{
    return{
        type:ASYNC_START
    }
}

export const asyncFinish=()=>{

    return{
        type:ASYNC_FINISH
    }

}


export const asyncError=()=>{

    return{
        type:ASYNC_ERROR
    }

}