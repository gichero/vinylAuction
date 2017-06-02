import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {Router, Route, Link, IndexLink, IndexRoute, hashHistory} from 'react-router';

import HomePageContainer from './vPages/homePage/homePage.js';
import HomePageReducer from './vPages/homePage/homePage.reducer';
import ProductDetailContainer from './vPages/productDetail/productDetail.js';
import ProductDetailReducer from './vPages/productDetail/productDetail.reducer';
import SignupReducer from './vPages/signup/signup.reducer';
import SignupContainer from './vPages/signup/signup.js';
import LoginReducer from './vPages/login/login.reducer';
import LoginContainer from './vPages/login/login.js';
import ShoppingCartReducer from './vPages/shoppingCart/shoppingCart.reducer';
import ShoppingCartContainer from './vPages/shoppingCart/shoppingCart.js';
import './index.css';

const reducer = Redux.combineReducers({
    HomePage: HomePageReducer,
    ProductDetail: ProductDetailReducer,
    Signup: SignupReducer,
    Login: LoginReducer,
    ShoppingCart: ShoppingCartReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
  Redux.applyMiddleware(ReduxThunk),
  autoRehydrate()
  )
);

persistStore(store);

class AppLayout extends React.Component {

    render(){
        let topRight;
    console.log(this.props.userinfo);
    if (this.props.userinfo != null){
        topRight = (
            <div className='topRight'>
            <li><Link to="/shoppingCart">cart</Link></li>
                <h3>{'Welcome' + this.props.userInfo.username}</h3>
            </div>
    );
  }
        return(
            <div>
      <div>
        <div className="navbar">
          <h2 className = "">VinylAuction.com</h2>
          <h4><IndexLink to="/" activeClassName="active">All Records</IndexLink></h4>
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

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Router history={hashHistory}>
            <Route path = "/" component={AppLayout}>
            <IndexRoute component={HomePageContainer}/>
            <Route path="/productDetail/:id" component={ProductDetailContainer}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/signup" component={SignupContainer}/>
            <Route path="shoppingCart" component={ShoppingCartContainer}/>
            </Route>
        </Router>
    </ReactRedux.Provider>,
  document.getElementById('root')
);
