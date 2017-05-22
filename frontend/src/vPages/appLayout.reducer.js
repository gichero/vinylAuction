export default function AppLayoutReducer(state={userInfo:null},action){
  if(action.type === 'login'){
    return Object.assign({}, state, {
      userInfo: action.payload
    });
  }  else
 if (action.type === 'userlogin'){
      return Object.assign({}, state, {
        uLog: action.text
      });
  }  else if (action.type === 'passlogin'){
        return Object.assign({}, state, {
          uPass: action.text
        });
      }
      else if (action.type === 'logOut'){
          return Object.assign({}, state, {
            userInfo: null
          });
        }
  return state;
}
