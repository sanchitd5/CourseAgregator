import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UniLOGO from 'components/UniLogo/unilogo.jsx';



class Cards extends Component {


  constructor(props) {
    super(props)
    this.state = {
      notifyAgent: false,
      data: []
    };

    this.notifyAgent = this.notifyAgent.bind(this)
  }

  notifyAgent() {
    this.setState({notifyAgent: true})
    let data = {
      id: this.props.data.id,
      title: this.props.data.Title,
      university: this.props.data.university
    }
    let temp = this.props.parentState.courseData
    temp.push(data)
    this.props.parentStateHandler({courseData: temp})
    console.log('[PARENT STATE]',this.props.parentState)
    //window.localStorage.setItem("agentData", data)
  }

  componentDidMount() {
    this.setState({
      students: window.localStorage.getItem("students") || "[]"
    })
    if(this.props.data > 0)
    this.setState({
      data: this.props.data
    })
  }
  render() {
    console.log('[PROPS]',this.props.data)
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
                    <div className="">{this.props.data.university.name}</div>
                  </div>
                  <div className="col l12 m12 s12">
                    <div className="">Course Level: {this.props.data.courseLevel
                      // (this.props.data.courseLevel.toLowerCase() === "master" ? "Master" : (
                      //   this.props.data.courseLevel.toLowerCase() === "phd" ? "Doctrate" : (
                      //     this.props.data.courseLevel.toLowerCase() === "diploma" ? "Diploma" :
                      //       (this.props.data.courseLevel.toLowerCase() === "bachelor" ? "Bachelor" : ''))))
                    }</div>
                  </div>
                  <div className="col l12 m12 s12">
                    {this.props.data.description}
                  </div>
                </div>
              </div>
              <div className="col l4 m0 s0">
                <UniLOGO uniname={this.props.data.university.name} key={Date.now()} />

              </div>

            </div>
          </div>
          <div className="card-action">
            <Link className="red-text" to={{ pathname: '/courseDetail', params: this.props.data }}>Details</Link>
            {this.state.notifyAgent === false ? <Link className="red-text" to={{ params: this.props.data }} onClick={this.notifyAgent}>Send your expression of Interest</Link> : <Link className="red-text" to={{ params: this.props.data }}>Sent</Link>}
          </div>
        </div>
      );
    }
    else if (this.props.Ctype === "btn") {
      return (
        <div className="card darken-1">
          <div className="card-content black-text">
            <span className="card-title left-align">{this.props.data.name}</span>
            <p className="truncate left-align">
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
              <div className="card-action center red-text">
                {
                  this.props.link !== undefined ? <Link className="red-text" to={{ pathname: '/home', params: this.props.data }}>View Courses</Link> : null
                }
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
    else if (this.props.Ctype === "advert") {
      return (
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img alt="adv-img" className="activator" src="https://mumbrella.com.au/wp-content/uploads/2016/09/18_Deakin_Hero1_Billboard_8x13-1.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">Deakin university<i className="material-icons right">more_vert</i></span>
            <p>Think Young</p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Think Young<i className="material-icons right">close</i></span>
            <p>Deakin is a young, vibrant and cutting-edge university with great ambitions, and it’s our people that are the embodiment of our culture and the essence of who we are as a brand.</p>
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


