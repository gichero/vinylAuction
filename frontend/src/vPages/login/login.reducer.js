const INITIAL_STATE = {
    userinfo: null
}

export default function AppLayoutReducer(state = INITIAL_STATE, action){
  if(action.type === 'login'){
    return Object.assign({}, state, {
      userinfo: action.payload
    });
  }  else
 if (action.type === 'username'){
      return Object.assign({}, state, {
        username: action.text
      });
  }  else if (action.type === 'password'){
        return Object.assign({}, state, {
          password: action.text
        });
      }
      else if (action.type === 'logout'){
          return Object.assign({}, state, {
            userinfo: null
          });
        }
  return state;
}
