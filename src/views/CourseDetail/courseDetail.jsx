import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Crousal from 'components/Crousal/crousal.jsx'
import UniLOGO from 'components/UniLogo/unilogo.jsx';


class CourseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.params

        }
    }

    render() {
        if ((typeof this.state.data) === 'undefined') return <Redirect to="/"></Redirect>
        return (
            <div className="">

                <Crousal Ctype="fullwidth" />
                <div className="row container">
                    <div className="section valign-wrapper">
                        <div className="col s0 l3 m3 hide-on-med-and-down">
                            <UniLOGO uniname={this.state.data.University} />
                        </div>
                        <div className="col s12 l9 m9">
                            <div className="left-align section">
                                <h4>{this.state.data.Title}</h4>
                                <h5 className="">{this.state.data.University}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col s12 l12 m12">
                        <p className="flow-text left-align">{this.state.data.Description}</p>
                    </div>
                    <div className="col s12 l12 m12">
                        <ul className="tabs tabs-fixed-width grey lighten-4">
                            <li className="tab "><a className="active red-text" href="#facts">Key Facts</a></li>
                            <li className="tab red-text"><a className="red-text" href="#info">Course Information</a></li>
                            <li className="tab red-text"><a className="red-text" href="#requirements">Entry Requirements</a></li>
                            <li className="tab red-text"><a className="red-text" href="#fees">Fee and Scholarships</a></li>
                        </ul>
                    </div>
                    <div className="divider"></div>
                    <br />
                    <div id="facts" className="col s12 l12 m12">
                        <h4 className="left-align red-text">Key Facts</h4>
                        <div className="row valign-wrapper">
                            <div className="col l6 m6 s12 section left-align">
                                <div className="row ">
                                    <div className=" left-align col l6 m6 s12 section">
                                        <h5 className="pink-text">Duration</h5>
                                        <h6>{this.state.data.duration} years full-time or part-time equivelent</h6>
                                    </div>
                                    <div className="col l6 m12 s12 section left-align">
                                        <h5 className="pink-text">Location</h5>
                                        <h6>{this.state.data.Country}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col l6 m6 s12 hide-on-small-only"></div>
                        </div>

                    </div>
                    <div id="info" className="col s12 l12 m12">
                        <h4 className="left-align red-text">Course Information</h4>
                        <p className="flow-text left-align"><div className="green-text">[To be replaced by uni's course specific info]</div> {this.state.data.Description}</p>
                    </div>


                    <div id="requirements" className="col s12 l12 m12">
                        <h4 className="left-align red-text">Entry Requirements</h4>
                        <p className="flow-text left-align"><div className="green-text">[To be replaced by entry requirements specific info]</div> {this.state.data.Description}</p>
                    </div>

                    <div id="fees" className="col s12 l12 m12">
                        <h4 className="left-align red-text">Fee Requirements</h4>
                        <p className="flow-text left-align">Estimated Tutiton Fee : ${this.state.data.Fees}</p>
                
                    </div>

                </div>
            </div>
        );
    }
}

export default CourseDetail;
