const INITIAL_STATE = {
    username: null,
    email: null,
    firstname: null,
    lastname: null,
    password: null,
    confpassword: null,
    error: null
};

export default function reducer(state = INITIAL_STATE, action){
    if(action.type === 'username'){
        return Object.assign({}, state, {
            username: action.text
        });
    }
    else if(action.type === 'email'){
        return Object.assign({}, state, {
            email:action.text
        });
    }
    else if(action.type === 'firstname'){
        return Object.assign({}, state, {
            firstname: action.text
        });
    }
    else if(action.type === 'lastname'){
        return Object.assign({}, state, {
            lastname: action.text
        });
    }
    else if(action.type === 'password'){
        return Object.assign({}, state, {
            password: action.text
        });
    }
    else if(action.type === 'confpassword'){
        return Object.assign({}, state, {
            confpassword: action.text
        });
    }
    else if(action.type === 'submit'){
        return state;
    }
    else if (action.type === 'error'){
        return Object.assign({}, state, {
            error: true
        });
    }
        return state;
}
