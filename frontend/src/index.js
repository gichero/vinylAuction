import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
import HomePageContainer from './vPages/homePage.js';
import './index.css';

const reducer = Redux.combineReducers({
    HomePage: HomePageReducer
});

class AppLayout extends React.Component {
    render(){

        return(
        <div>
            <div className = "navbar">
                <h1>Welcome to the Vinyl Auction</h1>
            </div>
        </div>
    );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path = "/" component={AppLayout}>
        <IndexRoute component={HomePageContainer}/>
        </Route>
    </Router>,
  document.getElementById('root')
);
