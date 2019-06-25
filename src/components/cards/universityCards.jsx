

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UniLOGO from 'components/UniLogo/unilogo.jsx';
import API from 'helpers/api.js';
import LoadingComponent from '../loading/loading';
import M from 'materialize-css';

class UniversityCard extends Component {


  constructor(props) {
    super(props)
    this.state = {
      notifyAgent: false,
      data: [],
      courseid: [],
      submitStatus: false
    };

    this.notifyAgent = this.notifyAgent.bind(this)
    this.checkApplications = this.checkApplications.bind(this)
  }

  stateHandler = (state) => {
    this.setState(state);

  }
  componentWillMount() {

  }
  componentDidMount() {
    console.log('[DID MOUNT]')
    API.getStudentApplications(window.localStorage.getItem("studentid"), this.stateHandler, this.checkApplications);

  }

  notifyAgent(e) {
    e.preventDefault();
    M.toast({ html: 'Submitted!' })
    API.sendCourseInterest(window.localStorage.getItem("studentid"), this.props.data._id)
    this.setState({
      notifyAgent: true
    })
    console.log('[NOTIFY AGENT]')
    //window.localStorage.setItem("agentData", data)
  }

  checkApplications() {
    console.log('[APPLICATION]')
    let applicationSubmitted;
    if (this.state.application === undefined) return <LoadingComponent></LoadingComponent>
    this.state.application.map(value => {
      if (value.studentId._id === window.localStorage.getItem("studentid")) {
        console.log('[PROPS ID]', this.props.data._id, '[ACTUAL API ID]', value.courseId._id)
        if (value.courseId._id === this.props.data._id) {
          applicationSubmitted = true
        }
      }
      if (applicationSubmitted !== undefined) {
        this.setState({
          applicationSubmitted: applicationSubmitted
        })
      }
    })
  }
  componentDidUpdate() {
  }
  render() {
    if (this.props.data === undefined || this.props.data.length === 0) return <LoadingComponent></LoadingComponent>
    return (
      <div className="card university-card">
        <div className="card-image ">
          <UniLOGO uniname={this.props.data.university.name} key={Date.now()} />
          <span className="card-title black-text">{this.props.data.name}</span>
        </div>
        <div className="card-content">
          <p>{this.props.data.description}</p>
        </div>
        <div className="card-action">
          <Link className="red-text " to={{ pathname: '/courseDetail', params: this.props.data }}>Details</Link>
          {Boolean(this.state.applicationSubmitted) ?
            this.state.notifyAgent === false ?
              <Link className="red-text"
                to={{
                  params: this.props.data
                }}>
                Submitted
          </Link>
              : <Link className="red-text"
                to={{
                  params: this.props.data
                }}
                onClick={this.notifyAgent}>
                Send Expression of Interest
              </Link>
            : <Link className="red-text"
              to={{
                params: this.props.data
              }}
              onClick={this.notifyAgent}>
              Send Expression of Interest
            </Link>}
        </div>
      </div>
    )
  }
}
export default UniversityCard;







