import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from "../../common/utils/reducerUtils";

const initialState={
    data:11
}



// const testReducer=(state=initialState, action) =>{
//     switch (action.type) {
//         case INCREMENT_COUNTER:
//             return {...state, data: state.data+1};
//         case DECREMENT_COUNTER:
//             return{...state, data: state.data-1};
//         default:
//             return state;

//     }
// }

const incrementCounter = state=>{
 return {...state,data: state.data+1}
}

const decrementCounter = state=>{
    return {...state, data: state.data-1}
}



export default createReducer( initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER] : decrementCounter
})