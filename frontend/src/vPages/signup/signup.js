import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './signup.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

class Signup extends React.Component{
    render(){
        let object = {
            username: this.props.username,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            password: this.props.password,
            confpassword: this.props.confpassword
        }
        let mismatch;
        if(this.props.error){
            mismatch= 'password did not match';
        }
        return(
            <div className='signup'>

                <h2>Sign Up</h2>
                {mismatch}
                <h3>Username</h3>
                <input onChange={(event)=>this.props.write(event.target.value,'username')}placeholder='username' type='text' className='username'/>

                <h3>Email</h3>
                <input name='email' onChange={(event)=>this.props.write(event.target.value, 'email')}placeholder='email' type='text' className='email'/>

                <h3>First Name</h3>
                <input name='firstname' onChange={(event)=>this.props.write(event.target.value, 'firstname')}placeholder='first name'type ='text'className='firstname'/>

                <h3>Last Name</h3>
                <input name='lastname' onChange={(event)=>this.props.write(event.target.value, 'lastname')}placeholder='last name' type='text' className='lastname'/>

                <h3>Password</h3>
                <input name='password' onChange={(event)=>this.props.write(event.target.value, 'password')}placeholder='password' type='text' className='password'/>

                <h3> Confirm Password</h3>
                <input name='confpassword' onChange={(event)=>this.props.write(event.target.value, 'confpassword')}placeholder='confirm password' type='text' className='confpassword'/>
                <br/>

                <button onClick={()=>this.props.signup(object)}>Signup</button>

            </div>
        )
    }
}

const SignupContainer = ReactRedux.connect(
  state => state.Signup,
  actions
)(Signup);

export default SignupContainer;
