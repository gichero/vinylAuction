import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';
import HomePageContainer from './vPages/homePage.js';
import HomePageReducer from './vPages/homePage.reducer';
import ProductDetailContainer from './vPages/productDetail.js';
import ProductDetailReducer from './vPages/productDetail.reducer';
import SignupReducer from './vPages/signup.reducer';
import SignupContainer from './vPages/signup';
import AppLayoutReducer from './vPages/appLayout.reducer';
import * as actions from './vPages/appLayout.actions';
import './index.css';

const reducer = Redux.combineReducers({
    HomePage: HomePageReducer,
    ProductDetail: ProductDetailReducer,
    Signup: SignupReducer,
    AppLayout: AppLayoutReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

class AppLayout extends React.Component {

    render(){
        let topRight;
    console.log(this.props.userinfo);
    if (this.props.userinfo != null){
        topRight = (
            <div className='topRight'>
            <button><Link to="/Checkout">cart</Link></button>
                <h3>{'Welcome' + this.props.userInfo.username}</h3>
            </div>
    );
  }

        return(
            <div>
      <div>
        <div className="navbar">
          <h1><IndexLink to="/" activeClassName="active">VinylAuction</IndexLink></h1>
          {topRight}
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    </div>
    )
  }
}

const AppLayoutContainer = ReactRedux.connect(
  state => state.AppLayout,
  actions
)(AppLayout);



ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path = "/" component={AppLayout}>
            <IndexRoute component={HomePageContainer}/>
            <Route path="/productDetail/:id" component={ProductDetailContainer}/>
            <Route path="/signup" component={SignupContainer}/>
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
