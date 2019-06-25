import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import API from 'helpers/api.js';
import LoadingComponent from '../../components/loading/loading';
class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.location.params,
      notifyAgent: false
    }

    this.notifyAgent = this.notifyAgent.bind(this)
  }

  componentDidMount() {
    M.AutoInit()
    this.checkApplications()
  }

  checkApplications() {
    if (this.state.application === undefined) return <LoadingComponent></LoadingComponent>
    this.state.application.map(value => {
      return (
        value.studentId._id === window.localStorage.getItem("studentid") ? this.setState({
          applicationSubmitted: true
        }) : this.setState({
          applicationSubmitted: false
        })
      )
    })
  }

  notifyAgent(e) {
    e.preventDefault();
    M.toast({ html: 'Submitted!' })
    console.log('[DATA]', this.state.data)
    API.sendCourseInterest(window.localStorage.getItem("studentid"), this.state.data._id)
    this.setState({
      notifyAgent: true
    })
  }
  render() {
    if ((typeof this.state.data) === 'undefined') return <Redirect to="/"></Redirect>
    return (
      <div class="row center-align">
        <div class="col s12 m5">
          <div class="card-panel">
            <span class="black-text"><p>Name: {this.state.data.name}</p>
              <p>CourseLevel: {this.state.data.courseLevel}</p>
              <p>Department: {this.state.data.department}</p>
              <p>Description: {this.state.data.description}</p>
              <p>University: {this.state.data.university.name}</p>
              <p>Contact: {this.state.data.contact}</p>
              <p>Website: <a href={this.state.data.website}>{this.state.data.website}</a></p>
              <p>Tuition: {this.state.data.fees}</p>
            </span>
            <div className="row">
              {Boolean(this.state.applicationSubmitted) ?
                this.state.notifyAgent === false ?
                  <Link className="waves-effect waves-light btn"
                    to={{
                      params: this.props.data
                    }}
                    onClick={this.notifyAgent}>
                    Send your expression of Interest
              </Link> :
                  <Link className="waves-effect waves-light btn"
                    to={{
                      params: this.props.data
                    }}>
                    Submitted
              </Link> : <Link className="waves-effect waves-light btn"
                  to={{
                    params: this.props.data
                  }}>
                  Submitted
              </Link>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetail;
