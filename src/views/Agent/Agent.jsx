import React, { Component } from 'react';
import API from 'helpers/api.js';
import Loading from '../../components/loading/loading'
import { Redirect } from 'react-router';
import M from 'materialize-css';

class Agent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      agentView: false,
      track: false,
    }

    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.trackApplication = this.trackApplication.bind(this)
  }
  stateHandler = (state) => {
    this.setState(state);

  }

  componentDidMount() {
    API.getStudents(this.stateHandler)
    window.localStorage.setItem("loggedIn", false);
  }
  componentDidUpdate() {
    M.FormSelect.init(document.querySelectorAll('select'));
    if (this.state.application !== undefined) {
      window.localStorage.setItem("applicationStatus", JSON.stringify(this.state.application))
      this.setState({
        track: true,
      })
    }
  }

  trackApplication(e) {

    console.log('[TRACK]', e.target.getAttribute("courseid"))
    this.setState({
      trackUniversity: e.target.getAttribute("courseid")
    })
    API.getStudentApplications(e.target.getAttribute("studentid"), this.stateHandler);

  }

  sendUpdatedStatus(studentId, courseId, value) {
    switch (value) {
      case "1": API.updateApplicationStatus(studentId, courseId, "UNDER REVIEW")
        break;
      case "2": API.updateApplicationStatus(studentId, courseId, "DONE")
        break;
      default: console.log('DEFAULT')
        break;
    }
  }

  handleStatusChange(e) {
    let studentId = e.target[e.target.selectedIndex].getAttribute("studentId")
    let courseId = e.target[e.target.selectedIndex].getAttribute("courseId")
    this.sendUpdatedStatus(studentId, courseId, e.target.value)
  }
  render() {
    console.log('[RENDER]', this.state)
    let date = new Date()
    if (this.state.students === undefined || this.state.students.length === 0) return <Loading></Loading>
    return (
      <div className="Home">
        <h1>WELCOME</h1>
        <h5>List of interested Students</h5>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Course Name</th>
              <th>University</th>
              <th>Status</th>
              <th>Track</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{date.toLocaleTimeString()}</td>
                    <td>{index + 1}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.interestedCourses.map((course, key) => {
                      return (
                        <p key={key}>
                          {course.name}
                        </p>)
                    })}</td>
                    <td>{student.interestedCourses.map((course, key) => {
                      return (
                        <p key={key}>
                          {course.university.name}
                        </p>)
                    })}</td>
                    <td className="input-field">
                      {student.interestedCourses.map((course, key) => {
                        return (
                          <select key={key} onChange={this.handleStatusChange}>
                            <option value="" defaultValue>Choose your option</option>
                            <option studentId={student._id} courseId={course._id} value="1">Under Review</option>
                            <option studentId={student._id} courseId={course._id} value="2">Submitted to University</option>
                          </select>
                        )
                      })}
                    </td>
                    {console.log("Link data", student.applicationStatus)}
                    <td>
                      {student.interestedCourses.map((course, key) => {
                        return (
                          <p key={key}>
                            <a
                              href="#!"
                              className="waves-effect waves-light btn"
                              onClick={this.trackApplication}
                              studentid={student._id}
                              courseid={course._id}
                            >
                              Track
                        </a>
                          </p>
                        )
                      })}
                    </td>
                    <td><a href="!#" className="waves-effect waves-light btn">Contact</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {
          this.state.track === true ? <Redirect
            to={{
              pathname: "/trackapplication",
              state: { status: this.state.application, trackUniversity: this.state.trackUniversity }
            }}
          /> : null
        }
      </div>
    );
  }
}

export default Agent;
