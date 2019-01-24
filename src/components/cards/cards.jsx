import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UniLOGO from 'components/UniLogo/unilogo.jsx';



class Cards extends Component {


  constructor(props) {
    super(props)
    this.state = {
      agents: this.props.agents

    }
  }
  render() {
    //  console.log(this.props.location.agents)

    if (this.props.Ctype === "Cdesc" && this.props.previousField === this.props.data.coursetype) {

      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card darken-1">
              <div className="card-content black-text">
                <span className="card-title">{this.props.data.Title}</span>
                <table>
                  <tbody>
                    <tr><th>University Name</th><td>{this.props.data.University}</td></tr>
                    <tr><th>Fee</th><td>{this.props.data.Fees}</td></tr>
                    <tr><td rowSpan="2" align="justify">{this.props.data.Description}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="card-action">
                <Link to={{ pathname: '/CoursesContent', state: { title: this.props.data.Title, userId: this.props.data.id, description: this.props.data.Description, coursetype: this.props.data.coursetype, agents: this.state.agents } }}>Click Me</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.Ctype === "Cdesc" && this.props.previousField == null) {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card darken-1">
              <div className="card-content black-text">
                <span className="card-title">{this.props.data.Title}</span>
                <table>
                  <tbody>
                    <tr><th>University Name</th><td>{this.props.data.University}</td></tr>
                    <tr><th>Fee</th><td>{this.props.data.Fees}</td></tr>
                    <tr><td rowSpan="2" align="justify">{this.props.data.Description}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="card-action">
                <Link to={{ pathname: '/CoursesContent', state: { title: this.props.data.Title, userId: this.props.data.id, description: this.props.data.Description, coursetype: this.props.data.coursetype, agents: this.state.agents } }}>Click Me</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.Ctype === "btn") {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card  darken-1">
              <div className="card-content black-text">
                <span className="card-title">{this.props.data.name}</span>
                <p>
                  {this.props.data.desc}
                </p>
              </div>
              <div className="card-action">
                <Link to={{ pathname: '/CourseHome', feild: this.props.data.feild }}><p>Select Course</p></Link>
              </div>
            </div>
          </div>
        </div>
      );

    } else if (this.props.Ctype === "landing") {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card darken-1">
              <div className="card-content black-text">
                <span className="card-title">{this.props.data.title}</span>
                <div className="divider"></div>
                <br />
                <p>
                  {this.props.data.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.Ctype === "dummy") {
      return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card darken-1">
              <div className="card-content black-text">
                <span className="card-title">Dummy Card</span>
                <div className="divider"></div>
                <br />
                <p>
                  LOREM OPSEM
              </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if ((this.props.Ctype === "CdescNEW" && this.props.previousField === this.props.data.coursetype) || (this.props.Ctype === "CdescNEW" && this.props.previousField == null)) {

      return (
        <div className="card">
          <div className="card-content valign-wrapper">
            <div className="row valign-wrapper ">
              <div className="col l8 m12 s12">
                <div className="row left-align">
                  <div className="col l12 m12 s12">
                    <h5>{this.props.data.Title}</h5>
                  </div>
                  <div className="col l12 m12 s12">
                    <div className="">{this.props.data.University}</div>
                  </div>
                  <div className="col l12 m12 s12">
                    <div className="">Course Level: {
                      (this.props.data.degreelevel.toLowerCase() === "master" ? "Master" : (this.props.data.degreelevel.toLowerCase() === "phd" ? "Doctrate" : (this.props.data.degreelevel.toLowerCase() === "diploma" ? "Diploma" :
                        (this.props.data.degreelevel.toLowerCase() === "bachelor" ? "Bachelor" : ''))))
                    }</div>
                  </div>
                </div>
              </div>
              <div className="col l4 m0 s0">
                <UniLOGO uniname={this.props.data.University} />
              </div>

            </div>
          </div>
          <div className="card-action left-align">
            Details
          </div>
        </div >
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}
export default Cards;


