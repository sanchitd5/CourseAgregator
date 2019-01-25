import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UniLOGO from 'components/UniLogo/unilogo.jsx';



class Cards extends Component {


  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {

    if (this.props.Ctype === "Cdesc" && this.props.previousField === this.props.data.coursetype) {

      return (
        <div className="card">
          <div className="card-content valign-wrapper">
            <div className="row valign-wrapper">
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
                      (this.props.data.degreelevel.toLowerCase() === "master" ? "Master" : (
                        this.props.data.degreelevel.toLowerCase() === "phd" ? "Doctrate" : (
                          this.props.data.degreelevel.toLowerCase() === "diploma" ? "Diploma" :
                            (this.props.data.degreelevel.toLowerCase() === "bachelor" ? "Bachelor" : ''))))
                    }</div>
                  </div>
                </div>
              </div>
              <div className="col l4 m0 s0">
               <UniLOGO uniname={this.props.data.University } key={Date.now()} />
                
              </div>

            </div>
          </div>
          <div className="card-action left-align">
            <Link className="red-text" to={{ pathname: '/courseDetail', params: this.props.data }}>Details</Link>
          </div>
        </div>
      );
    }
    else if (this.props.Ctype === "btn") {
      return (
        <div className="card darken-1">
          <div className="card-content black-text">
            <span className="card-title left-align">{this.props.data.name}</span>
            <p className="left-align">
              {this.props.data.desc}
            </p>
          </div>
          <div className="card-action left-align red-text">
            <Link className="red-text" to={{ pathname: '/CourseHome', feild: this.props.data.feild }}>Select Course</Link>
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


