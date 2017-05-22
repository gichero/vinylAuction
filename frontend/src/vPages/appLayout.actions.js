import { Router, Route, hashHistory, Link, IndexRoute, IndexLink } from 'react-router';

import $ from 'jquery';



export function write(event,type){
  return {
    type: type,
    text: event
  }
}
export function logOut(){
  return{
    type: 'logOut',
  }
}
export function logIn(data){
  let asyncAction = function(dispatch){
    $.ajax({
      type: 'POST',
      contentType: "application/json",
      url: 'http://localhost:4000/api/user/login',
      data: JSON.stringify({
        username: data.user,
        password: data.pass,
      }),
      dataType: "json"
    })
    .then(info=>dispatch(logInInfo(info)))
  }
  return asyncAction;
}



function logInInfo(info){
  return{
    type: 'login',
    payload: info
  }
}
