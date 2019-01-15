import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from 'materialize-css';
import {Link} from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
    this.state={};
    M.AutoInit();
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatchLogout()
    AppHelper.logoutUser()
    
  }

  assignDropdown= () =>{
    let dropper= document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropper,{constrainWidth: false, coverTrigger: false});
    console.log("Dropdown Triggered");
  }
  componentDidMount(){
    this.assignDropdown();
  }
 
  render() {

    return (
      <header>
      <div className="navbar-fixed">
          <nav className="black lighten-2">
            <div className="nav-wrapper">
             <div className="brand-logo center"><Link to="/home">b00keep3r</Link></div>
              <ul className="right">
              <li>                
              {(AppHelper.isUserLocalStorageLoggedIn()?<a className='dropdown-trigger' href='#!' data-beloworigin="true" data-target='user-dropper'><i className="material-icons right">arrow_drop_down</i></a>:<Link to="/login"><div className="btn red" href="#!">{this.props.loginLABEL}</div></Link>)}
              
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <ul id='user-dropper' className='dropdown-content'>
            <li><a className="waves-effect waves-light" href="#!" disabled="disabled">Settings</a></li>            
            <li><a onClick={this.logout} className="waves-effect waves-light" href="#!">Logout</a></li>
        </ul>

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
