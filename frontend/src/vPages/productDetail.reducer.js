const INITIAL_STATE = {
    items: []
}

export default function productDetailReducer(state = INITIAL_STATE,action){

    if(action.type === 'fetchImage'){
        return Object.assign({}, state, {
            items: action.payload
        });
    }
    return state;
}
