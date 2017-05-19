import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
import './index.css';




class AppLayout extends React.Component {
    render(){

        return(
        <div>
            <h1>Welcome to the Vinyl Auction</h1>
        </div>
    );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path = "/"
            component={AppLayout}>
        </Route>
    </Router>,
  document.getElementById('root')
);
