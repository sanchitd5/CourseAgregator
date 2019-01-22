import React, { Component } from 'react';
import MainBackground from 'images/login_background.jpg'
import {Link} from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url('+MainBackground+')',
       error: false,
      errorMsg: '',
      signUp:{fName:"",lName:"",username:"",pass:"",cPass:""},
      userdetails:[],
      signupUserFlag:false,
    };

    
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  handleSignUpChange=(event)=>{
    let un=this.state.signUp.username;
    let fn=this.state.signUp.fName;
    let ln=this.state.signUp.lName;
    let cp=this.state.signUp.cPass;
    let p=this.state.signUp.pass;
    let change=false;
    if(event.target.id==="signup-fname"){
      fn=event.target.value;
      change=true;
    }
    if(event.target.id==="signup-lname"){
      ln=event.target.value;
      change=true;
    }
    if(event.target.id==="signup-uname"){
      un=event.target.value;
      change=true;
    }
    if(event.target.id==="signup-password"){
      p=event.target.value;
      change=true;
    }
    if(event.target.id==="signup-cpassword"){
      cp=event.target.value;
      change=true;
    }
    if(change===true){
      this.setState({signUp:{fName:fn,lName:ln,username:un,pass:p,cPass:cp}});
    }
  
  }
  
  

  getUsers(stateHandler){
    
    let users=[];
    axios.get("https://launchpad-red.au-syd.mybluemix.net/agrregator/api/getUser").then(res=>
    {
      res.data.map((value,i)=>
      {
          users.push(value.username);
      });
      stateHandler({userdetails:users});   
      console.log(this.state.userdetails);
       if(this.state.userdetails.indexOf(this.state.signUp.username) >= 0){
        this.setState({signupUserFlag:true});
        M.toast({html:'User Already Exists!'});
        
      return;
      }
      if(false&&this.state.signUp.pass===this.state.signUp.cPass&&this.state.signUp.cPass.length&&this.state.signUp.pass.length)
      {
        let details={fName:this.state.signUp.fName,lName:this.state.signUp.lName,usename:this.state.signUp.username,password:this.state.signUp.pass};
        axios.post("https://launchpad-red.au-syd.mybluemix.net/agrregator/api/userRegister", details)
        .then(res => {
        console.log(res);
        console.log(res.data);
                    });
      }
    });
    
  }
  

submitDetails(){
  this.getUsers(this.stateHandler);
  
}


componentDidMount(){



}

  render() {
    document.body.style.backgroundImage=this.state.backgroundImage;
    return ( 
  <div className="SignUp">
      <div className="container">
        <div className="login-pageX">
          <div className="formX">
            <div className="login-formX" id="login_form">
            <label className="flow-text">Fill in your Details </label><br/><br/>
            <div className="Section">
            <input placeholder="First Name"  id="signup-fname" type="text" className="validate" onChange={this.handleSignUpChange}/>
            <input placeholder="Last Name" id="signup-lname" type="text" className="validate" onChange={this.handleSignUpChange}/>
            <input placeholder="Username"  id="signup-uname" type="text" className="validate" onChange={this.handleSignUpChange}/>
            <input placeholder="Password" id="signup-password" type="password" className="validate"  onChange={this.handleSignUpChange}/>
            <input placeholder="Confirm Password" id="signup-cpassword" type="password" className="validate"  />
             <br/><br/>  
                {
                  this.props.loginLoading ?
                    "Loading..." :
                    <button className="red waves-effect waves-light" onClick={()=>{this.submitDetails()}} >
                      Next
                    </button>
                }</div> 
                 <br/><Link to="/login"><label><h6>Back</h6></label></Link>
            </div>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

export default SignUp;
