import React, { Component } from 'react';
import M from 'materialize-css';
import API from 'helpers/api.js';
import LoadingComponent from '../../components/loading/loading';

class Documents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }

    }
    componentDidMount() {
        M.AutoInit()
        this.setState({ student: window.localStorage.getItem("students"), getDocuments: true })

    }
    componentDidUpdate() {
        if (this.state.student !== undefined) {
            console.log('DOCUMENTS')

            if (this.state.getDocuments) {
                let student = JSON.parse(this.state.student)
                API.downloadDocuments(student[0]._id, this.stateHandler)
            }
        }
        else
            console.log('ELSE')
    }
    stateHandler = (state) => {
        this.setState(state);

    }

    /**
     * http://localhost:4000 was local python http server for serving files
     */
    render() {
        if ((typeof this.state.student) === 'undefined') return <LoadingComponent></LoadingComponent>
        if ((typeof this.state.files) === 'undefined') return <LoadingComponent></LoadingComponent>
        let student = JSON.parse(this.state.student)
        console.log('[FILEPATH]', student[0]._id)
        return (
            <div className="row center-align">
                <div className="col s12 m5">
                    <div className="card-panel">
                        <span className="card-title">Documents</span>
                        <br />
                        {this.state.files.map((file, key) => {
                            return (
                                <div className="row" key={key}>
                                    <a key={key} href={"http://localhost:4000/Uploads/" + student[0]._id + "/" + file}>{file}</a>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Documents;
