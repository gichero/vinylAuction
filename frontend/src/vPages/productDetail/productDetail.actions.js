import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from "react-router";
import $ from 'jquery';

function pageInfo(info){
    return{
        type: 'detailImage',
        payload: info
    }
}

function bidInfo(info){
    return{
        type: 'newBid',
        payload:info
    }
}

export function fetchProduct(id){
    console.log("fetchImage")
    let asyncAction = function(dispatch){
        $.ajax({
            url: 'http://localhost:4000/api/product/' + id
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
                product_id: data.product.id,
                token: data.login
            }),
            contentType: 'application/json'
        })
        .then(info=>dispatch(bidInfo(info)))
    }
        return asyncAction;
}
