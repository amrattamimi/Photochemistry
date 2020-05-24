// a function to help create a more concise reducers to, removes the switch method to avoid clutter 

export const createReducer = (initialState, functionMap) =>{
    return ( state=initialState, {type, payload}) =>{ //passing initial state as a state, specify type and payload
        const Handler =functionMap[type]; //object bracket notation, type will change into a string depending on what we pass in 
        return Handler? Handler(state,payload): state // return a state or an action (function)
    }
}   