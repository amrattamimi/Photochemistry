// a function to help create a more concise reducers to avoid the switch method

export const createReducer = (initialState, functionMap) =>{
    return ( state=initialState, {type, payload}) =>{
        const handler =functionMap[type];

        return handler? handler(state,payload): state
    }
}   