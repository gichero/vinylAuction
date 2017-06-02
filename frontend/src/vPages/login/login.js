import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './login.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';


class Login extends React.Component{

    render(){
        let object = {
            username: this.props.username,
            password: this.props.password

        }

        return(

            // <button onClick={()=>this.props.login({username:this.props.userlogin, password: this.props.passlogin})}>LogIn</button>

            <div className = "login">

            <h2>Login</h2>

            <h3>Username</h3>
            <input onChange={event=>this.props.write(event.target.value,'username')}className='username' type='text'/>

            <h3>Password</h3>
            <input onChange={event=>this.props.write(event.target.value,'password')}className='password' type='text'/> <br/>

            <button onClick={()=>this.props.login(object)}>Login</button>

            </div>

        )

    }

}

const LoginContainer = ReactRedux.connect(
  state => state.Login,
  actions
)(Login);

export default LoginContainer;
