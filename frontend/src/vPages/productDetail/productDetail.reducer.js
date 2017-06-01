const INITIAL_STATE = {
    items: [],
    bid: null
}

export default function ProductDetailReducer(state = INITIAL_STATE,action){

    if(action.type === 'detailImage'){
        return Object.assign({}, state, {
            items: action.payload,
            bid: action.payload.price
        });
    }
    if(action.type === 'newBid'){
        return Object.assign({}, state, {
             //items: action.payload,
            bid: action.payload.price
        });
    }
    return state;
}
