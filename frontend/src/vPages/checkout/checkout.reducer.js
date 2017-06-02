

export default function CheckoutReducer(state={userinfo:null},action){

  if(action.type === 'fetchImage'){
    return Object.assign({}, state, {
      allItems: action.payload
    });
  }else if(action.type === 'login'){
    return Object.assign({}, state, {
      userInfo: action.payload
    });
}  else if (action.type === 'username'){
      return Object.assign({}, state, {
        username: action.text
      });
  }  else if (action.type === 'password'){
        return Object.assign({}, state, {
          password: action.text
        });
      }
  return state;
}
