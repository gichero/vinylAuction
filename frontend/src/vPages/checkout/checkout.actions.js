import {Router, Route, hashHistory, Link, IndexRoute, IndexLink} from "react-router";
import $ from 'jquery';


export function write(event,type){
  return {
    type: type,
    text: event
  }
}

function pageInfo(info){
    return{
        type: 'detailImage',
        payload: info
    }
}

export function getItems(user){
  let asyncAction = function(dispatch){
    $.ajax({
      url: 'http://localhost:4000/api/products'
    })
    .then(info=>dispatch(pageInfo(info)))
  }
  return asyncAction;
  }
