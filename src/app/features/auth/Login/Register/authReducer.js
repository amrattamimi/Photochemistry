import { createReducer } from "../../../../common/utils/reducerUtils"
import { LOG_IN, LOG_OUT } from "./authConstants"

const initialState={
    authenticated: false,
    current_user:null
}

const signIn =(state, payload)=>{
    return{
        authenticated:true,
        current_user:payload.creds.email
    }
}

const signOut =()=>{
    return{
        authenticated:false
    }

}

export default createReducer(initialState,{
    [LOG_IN]: signIn,
    [LOG_OUT]: signOut
})