import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from "react-router";
import $ from 'jquery';

function pageInfo(info){
    return{
        type: 'fetchImage',
        payload: info
    }
}
export function fetchImage(id){
    let asyncAction = function(dispatch){
        $.ajax({
            url: 'http://localhost:4000/api/product/' +id
        })
        .then(info=>dispatch(pageInfo(info)))
    }
    return asyncAction;
}
