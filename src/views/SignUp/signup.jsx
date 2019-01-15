import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';
import MainBackground from 'images/login_background.jpg'
import M from 'materialize-css';
import {Link} from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url('+MainBackground+')',
      emailId: '',
      password: '',
      developerMode: true, // Change this to false to contact API
      error: false,
      errorMsg: ''

    };

  }

  render() {
    document.body.style.backgroundImage=this.state.backgroundImage;
    return (
      
  <div className="SignUp">
      <div className="container">
        <div className="login-pageX">
          <div className="formX">
            <form className="login-formX" id="login_form">
            <label className="flow-text">Fill in your Details </label><br/><br/>
            <div className="Section">
            <input placeholder="First Name" id="signup-fname" type="email" className="validate" onChange={this.handleEmailChange} />
            <input placeholder="Last Name" id="signup-lname" type="email" className="validate" onChange={this.handleEmailChange} />
            <input placeholder="Password" id="signup-password" type="password" className="validate" onChange={this.handlePasswordChange} />
            <input placeholder="Confirm Password" id="signup-cpassword" type="password" className="validate" onChange={this.handlePasswordChange} />
             <br/><br/>  
                {
                  this.props.loginLoading ?
                    "Loading..." :
                    <button className="red waves-effect waves-light" onClick={this.performSignUp} >
                      Next
                    </button>
                }</div> 
                 <br/><Link to="/login"><label><h6>Back</h6></label></Link>
            </form>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

export default SignUp;
