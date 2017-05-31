import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router';
import $ from 'jquery';


export function write(event,type){
  return {
    type: type,
    text: event
  }
}

function logout(info){
    return{
        type: 'logout'
    }
}

export function login(data){
    let asyncAction = function(dispatch){
        $.ajax({

            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:4000/api/user/login',
            data: JSON.stringify({

                username: data.username,
                password: data.password
            }),

            dataType: 'json'

            })

            .then(info=>dispatch(loginInfo(info)))
            hashHistory.push("/")
    }
    return asyncAction;
}

function loginInfo(info){
  return{
    type: 'login',
    payload: info
  }
}
