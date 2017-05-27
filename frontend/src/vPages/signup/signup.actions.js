import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from 'react-router';
import $ from 'jquery';

function pageInfo(info){
    return{
        type: 'signup'
    }
}
export function signup(data){
    console.log()
    console.log(data.password +' '+data.confpassword)
    if(data.password === data.confpassword){
        let asyncAction = function(dispatch){
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'http://localhost:4000/api/user/signup',
                data: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    first_name: data.firstname,
                    last_name: data.lastname,
                    password: data.password,
                    confpassword: data.confpassword
                }),
                dataType: 'json'
            })
            .then(info=>{
                dispatch(pageInfo(info))
                hashHistory.push("/")
            })

        }
        return asyncAction;
    }else{
        return{
            type: 'error'
        }
    }
}

export function write(event, type){
    return({
        type: type,
        text: event
    });
}
