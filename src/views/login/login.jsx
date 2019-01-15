import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';
import MainBackground from 'images/login_background.jpg'
import M from 'materialize-css';
import {Link} from 'react-router-dom';


class Login extends Component {
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

  assignDropdown= () =>{
    let elem= document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elem,{alignment:"right",constrainWidth: false});
  }

  errorMessage = () => {
    if (this.state.error) {
      return (
        <p><b>{this.state.errorMsg}</b></p>
      )
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      emailId: e.target.value
    });
    window.localStorage.setItem("username",e.target.value);
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  validationCheck = () => {
    let email = this.state.emailId
    let password = this.state.password
    if ((email.length > 0) && (password.length > 0)) {
      return true
    } else {
      this.setState({
        error: true,
        errorMsg: "Email or password must not be empty!"
      })
      return false
    }
  }

  performLogin = (e) => {
    e.preventDefault();
    if (this.state.developerMode) {
      console.log('inside developerMode login');
      this.props.dispatchDeveloperModeLogin();
      AppHelper.developerModeLoginUser(true);
      M.AutoInit();
      return;
    }
    console.log('outside developerMode login');
    if (!this.validationCheck()) return;
    this.props.dispatchLogin(this.state).then((response) => {
      if (
        response && response.payload && response.payload.data &&
        response.payload.data.data && response.payload.data.data.accessToken
      ) {
        const accessToken = response.payload.data.data.accessToken;
        AppHelper.loginUser(true, accessToken);
      } else {
        this.setState({
          error: true,
          errorMsg: "Invalid credentials!"
        })
      }
    });
  }

  render() {
    document.body.style.backgroundImage=this.state.backgroundImage;
    return (
      
  <div className="Login">
      <div className="container">

        <div className="login-pageX">
          <div className="formX">
            <form className="login-formX" id="login_form">
            <label className="flow-text">LOG IN</label><br/><br/>
            <div className="section">
            <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
            <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
              <br/><br/>  {this.errorMessage()}
                {
                  this.props.loginLoading ?
                    "Loading..." :
                    <button className="red waves-effect waves-light" onClick={this.performLogin} >
                      Login
                    </button>
                }
                </div>
            <Link to="/signup"><label><h6>New here?</h6></label></Link>
            </form>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: (data) => dispatch(requestLogin(data)),
    dispatchDeveloperModeLogin: () => dispatch(developerModeLogin())
  }
}

const mapStateToProps = (state) => {
  return {
    loginLoading: state.loginStatus.loginLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
