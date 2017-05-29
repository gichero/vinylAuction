import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './login.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';


class Login extends React.Component{

    render(){
        let object = {
            userlogin: this.props.userlogin,
            passlogin: this.props.passlogin
        }

        return(

            // <button onClick={()=>this.props.login({username:this.props.userlogin, password: this.props.passlogin})}>LogIn</button>

            <div className = "login">

            <h2>Login</h2>

            <h3>Username</h3>
            <input onChange={event=>this.props.write(event.target.value,'userlogin')}className='userlogin' type='text'/>

            <h3>Password</h3>
            <input onChange={event=>this.props.write(event.target.value,'passlogin')}className='passlogin' type='text'/>

            <button onClick={()=>this.props.login(object)}>Submit</button>

            </div>

        )

    }

}

const LoginContainer = ReactRedux.connect(
  state => state.Login,
  actions
)(Login);

export default LoginContainer;
