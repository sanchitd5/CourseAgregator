import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import API from 'helpers/api.js';
import LoadingComponent from '../../components/loading/loading';
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }

        this.trackApplication = this.trackApplication.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.uploadDocuments = this.uploadDocuments.bind(this)
    }

    componentDidMount() {
        M.AutoInit()
        this.setState({ student: window.localStorage.getItem("students") })
    }
    componentDidUpdate() {
        if (this.state.application !== undefined)
            this.setState({
                track: true
            })
    }
    stateHandler = (state) => {
        this.setState(state);

    }
    trackApplication(e) {

        console.log('[TRACK]', e.target.getAttribute("courseid"))
        this.setState({
            trackUniversity: e.target.getAttribute("courseid"),
        })
        API.getStudentApplications(e.target.getAttribute("studentid"), this.stateHandler);

    }

    handleFileChange(e) {
        let files = this.state.files
        Array.from(e.target.files).forEach(file => {
            console.log('[FILE]', file)
            files.push(file)
        })
        this.setState({
            files: [...files]
        })
    }
    uploadDocuments(e) {
        API.uploadDocuments(this.state.files, e.target.getAttribute('studentid'))
    }
    render() {
        if ((typeof this.state.student) === 'undefined') return <LoadingComponent></LoadingComponent>
        let student = JSON.parse(this.state.student)
        return (
            <div className="row center-align">
                <div className="col s12 m5">
                    <div className="card-panel">
                        <span className="card-title">Profile</span>
                        {student.map((student, key) => {
                            return (
                                <span className="black-text" key={key}>
                                    <p>Name: {student.firstName + ' ' + student.lastName}</p>
                                    <p>Email: {student.email}</p>
                                    <p>Mobile: {student.mobile}</p>
                                    <p>Gender: {student.gender}</p>
                                    <p>Applications:</p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>University Name</th>
                                                <th>Course</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
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
                                                    })}</td>
                                            </tr>
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
                                    <form name="documents" onChange={this.handleFileChange}>
                                        <input type="file" id="exampledocument" multiple />
                                    </form>
                                    <span>
                                        <p>Uploaded Documents:</p>
                                        {this.state.files.length > 0 ? this.state.files.map((file, key) => {
                                            return (
                                                <p key={key}>{file.name}</p>
                                            )
                                        }) : null}
                                    </span>
                                    <span>
                                        {this.state.files.length > 0 ? <a href="#!" className="waves-effect waves-light btn" onClick={this.uploadDocuments} studentid={student._id}>Upload</a> : null}
                                    </span>
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
