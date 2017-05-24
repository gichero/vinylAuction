const INITIAL_STATE = {
    items: []
}

export default function ProductDetailReducer(state = INITIAL_STATE,action){

    if(action.type === 'fetchImage'){
        return Object.assign({}, state, {
            items: action.payload
        });
    }
    return state;
}
