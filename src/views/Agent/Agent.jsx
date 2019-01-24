import React, { Component } from 'react';




class Agent extends Component {
  showAlert() {
    alert("Success");
  }
  render() {
    return (
      <div className="Home">
          <h1>WELCOME</h1>
          <h5>Contact {this.props.location.state.agent}</h5>
          <div className="row" >
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input id="Email" type="email" className="validate" />
                  
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="Query" type="text" className="validate" />
                 
                </div>
                <div onClick={this.showAlert} className="waves-effect waves-light btn">Submit</div>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Agent;
