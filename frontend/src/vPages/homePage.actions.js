import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router';
import $ from 'jquery';

export function pageInfo(info){
    console.log(info);
    return{
        type: 'fetchImage',
        payload: info
    }
}

export function loginInfo(info){
    return{
        type: 'logIn',
        payload: info
    }
}

export function logOut(){
    return{
        type: 'logOut'
    }
}

export function fetchImage(){
    let asyncAction = function(dispatch){
        $.ajax({
            url: 'http://localhost:4000/api/products/'
        })
        .then(info => dispatch(pageInfo(info)))
    }
    return asyncAction;
}

export function logIn(info){
    console.log(info.username);
    let asyncAction = function(dispatch){
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://localhost:4000/api/user/login',
            data: JSON.stringify({
                username: info.username,
                password: info.password,
            }),
            dataType: 'json'
        })
        .then(info=>dispatch(loginInfo(info)))
    }
        return asyncAction;
}

export function write(event, type){
    return{
        type: type,
        text: event
    }
}
