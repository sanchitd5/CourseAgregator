import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import Logo from 'images/bookeeper.svg'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFlag: false,
    };
    this.disbableLoginButton = this.disbableLoginButton.bind(this);
    this.enableLoginButton = this.enableLoginButton.bind(this);
    this.assignDropdown = this.assignDropdown.bind(this);
  }

  logout = (e) => {
    e.preventDefault();
    this.setState({ loginFlag: false })
    this.props.dispatchLogout()
    AppHelper.logoutUser()

  }

  assignDropdown = () => {
    M.Dropdown.init(this.dropdown, { constrainWidth: true, coverTrigger: false });
  }
  componentDidUpdate() {
    this.assignDropdown();
  }
  componentDidMount() {
    this.assignDropdown();
  }

  stateHandler = (state) => {
    this.setState(state);
  }
  disbableLoginButton() {
    if (!this.state.loginFlag) { this.setState({ loginFlag: true }); }
  }
  enableLoginButton() {
    if (this.state.loginFlag) { this.setState({ loginFlag: false }); }
  }
  render() {
    return (
      <header>
        <div className="navbar-fixed">
          <ul id='user-dropper' className='dropdown-content right-align'>
            <li ><a className="black-text waves-effect waves-light" href="#!" >Profile</a></li>
            <li ><a className="black-text waves-effect waves-light" href="#!" disabled="disabled">Settings</a></li>
            <li ><a onClick={this.logout} className="black-text waves-effect waves-light" href="#!">Logout</a></li>
          </ul>
          <nav className="App-header">
            <div className="nav-wrapper">
              <ul className="left"><li>
                {(AppHelper.isUserLocalStorageLoggedIn() ? <Link to="/landing"><i className="whtie-text material-icons">home</i></Link>
                  : '')}</li></ul>
              <div className="brand-logo center valign-wrapper"><Link to="/home" onClick={this.enableLoginButton}>LOGO</Link></div>
              <ul className="right ">
                <li>
                  {( AppHelper.isUserLocalStorageLoggedIn() ? <a className='dropdown-trigger' href='#!' ref={(dropdown) => { this.dropdown = dropdown }} data-beloworigin="true" data-target='user-dropper'><i className="material-icons right">menu</i></a>

                    : !this.state.loginFlag && <Link to="/login" onClick={this.disbableLoginButton}><div className="btn red" href="#!">{this.props.loginLABEL}</div></Link>)}
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </header>

    );

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogout: () => dispatch(requestLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
