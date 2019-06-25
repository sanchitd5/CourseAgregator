import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';
import MainBackground from 'images/login_background.jpg'
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import 'views/login/loginStyle.css'
import API from 'helpers/api.js';
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url(' + MainBackground + ')',
      emailId: '',
      password: '',
      developerMode: false, // Change this to false to contact API
      error: false,
      errorMsg: '',
      redirect: false
    };
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
    window.localStorage.setItem("username", e.target.value);
  }

  stateHandler = (state) => {
    this.setState(state);
    window.localStorage.setItem("students", JSON.stringify(this.state.students))
  }

  componentDidMount() {
    API.getStudents(this.stateHandler)
    window.localStorage.setItem("agentLogin", false)

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

  userSignIn = (e) => {
    e.preventDefault();
    console.log('[In user sign in]')
  

    if (!this.validationCheck()) return;

    API.studentLogin(this.state.emailId, this.state.password, AppHelper.loginUser)

  //  if(this.state.login !== 200) return 
  //   else return AppHelper.loginUser(true)
    
    // if (this.state.students.length > 0) {
    //   this.state.students.map(student => {
    //     return (
    //       Boolean((student.email === this.state.emailId) && (student.password === this.state.password)) ? AppHelper.loginUser(true) : this.setState({
    //         error: true,
    //         errorMsg: "Invalid credentials!"
    //       })
    //     )
    //   })

    // }
  }
  render() {
    return (

      <div className="Login">
        <div className="container">

          <div className="login-pageX">
            <div className="formX">
              <form className="login-formX" id="login_form">
                <label className="flow-text">LOG IN</label><br /><br />
                <div className="section">
                  <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                  <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
                  <br /><br />  {this.errorMessage()}
                  {
                    this.props.loginLoading ?
                      "Loading..." :
                      <button className="red waves-effect waves-light" onClick={this.userSignIn} >
                        Login
                    </button>
                  }
                </div>
                {
                  this.state.redirect === true ? <Redirect to='/landing'></Redirect> : null
                }
                <Link to="/signup"><label><h6>New here?</h6></label></Link>
                <Link to="/agentlogin"><label><h6>Agent Login</h6></label></Link>
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
