const INITIAL_STATE = {
    allImages: [],
    userinfo: null
};

    export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'fetchImage'){
        console.log(action.payload)
        return Object.assign({}, state, {
            allImages: action.payload
        });
    }else if(action.type === 'login'){
        return Object.assign({}, state, {
            userinfo: action.payload
        });
    }else if(action.type === 'userlogin'){
        return Object.assign({}, state, {
            userlogin: action.text
        });
    }else if(action.type === 'passlogin'){
        return Object.assign({}, state, {
            passlogin: action.text
        });
    }else if (action.type === "loginerror"){
         return Object.assign({}, state, {
             loginmessage:action.message
         });
     }else if (action.type === "logout"){
         console.log('logout');
         return Object.assign({}, state, {
            userinfo: null
     });
     }
  return state;
}
