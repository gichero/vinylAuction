const INITIAL_STATE = {
    userinfo: null
}

export default function AppLayoutReducer(state = INITIAL_STATE, action){
  if(action.type === 'login'){
    return Object.assign({}, state, {
      userinfo: action.payload
    });
  }  else
 if (action.type === 'userlogin'){
      return Object.assign({}, state, {
        userlogin: action.text
      });
  }  else if (action.type === 'passlogin'){
        return Object.assign({}, state, {
          passlogin: action.text
        });
      }
      else if (action.type === 'logout'){
          return Object.assign({}, state, {
            userinfo: null
          });
        }
  return state;
}
