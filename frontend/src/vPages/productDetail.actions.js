import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from "react-router";
import $ from 'jquery';

function pageInfo(info){
    console.log("firing detailImage")
    console.log(info);
    return{
        type: 'detailImage',
        payload: info
    }
}

export function fetchProduct(id){
    console.log("fetchImage")
    let asyncAction = function(dispatch){
        $.ajax({
            url: 'http://localhost:4000/api/product/' +id
        })
        .then(info=>dispatch(pageInfo(info)))
    }
    return asyncAction;
}


export function placeBid(data){
    console.log('data', data);

    let asyncAction = function(dispatch){
        $.ajax({
            type: "POST",
            url: 'http://localhost:4000/api/user/bid',
            data: JSON.stringify({
                user: data.user,
                product: data.product,
            }),
            contentType: 'application/json'
        })
    }
    return asyncAction;
}
