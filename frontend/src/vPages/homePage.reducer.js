const INITIAL_STATE = {
    allImages: [],
    userInfo: null
};

    export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'fetchImage'){
        console.log(action.payload)
        return Object.assign({}, state, {
            allImages: action.payload
        });

    }else if(action.type === 'logIn'){
        return Object.assign({}, state, {
            userInfo: action.payload
        });
    }else if(action.type === 'userLogin'){
        return Object.assign({}, state, {
            userLogin: action.text
        });
    }else if(action.type === 'passLogin'){
        return Object.assign({}, state, {
            passLogin: action.text
        });
    }else if (action.type === "loginError"){
         return Object.assign({}, state, {
             loginMessage:action.message
         });
     }else if (action.type === "logOut"){
         console.log('logOut');
         return Object.assign({}, state, {
            userInfo: null
     });
     }
  return state;
}
