

import React, { Component } from 'react';
import LoadingComponent from '../loading/loading';
import M from 'materialize-css';

class UniversityCard extends Component {


    constructor(props) {
        super(props)
        this.state = {
            notifyAgent: false,
            data: [],
            courseid: []
        };

        this.notifyAgent = this.notifyAgent.bind(this)
    }

    notifyAgent(e) {
        e.preventDefault();
        M.toast({ html: 'Submitted!' })
        this.setState({ notifyAgent: true })
        let data = {
            id: this.props.data._id,
            university: this.props.data.university.name
        }
        let temp = this.props.parentState.courseData
        temp.push(data)
        this.props.parentStateHandler({ courseData: temp })
        console.log('[PARENT STATE]', this.props.parentState)
        if (temp.length > 0) return console.log('[TEMP]', temp)
        //window.localStorage.setItem("agentData", data)
    }

    componentDidMount() {


        if (this.props.data !== undefined && this.props.data.length > 0) {
            window.localStorage.setItem("courseData", this.props.data)
            let courses = JSON.parse(window.localStorage.getItem("courseData"))
            let temp = []
            courses.forEach(course => {
                temp.push(course._id)
            })
            console.log('CourseData', temp)
            this.setState({
                courseid: temp
            })
        }
        else
            return <LoadingComponent></LoadingComponent>
    }
    render() {
        return (
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="adv-img" className="activator" src="https://mumbrella.com.au/wp-content/uploads/2016/09/18_Deakin_Hero1_Billboard_8x13-1.jpg" />
                </div>
                <div className="card-content">
                    <span className="card-title activator black-text">Deakin university<i className="material-icons right">more_vert</i></span>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Think Young<i className="material-icons right">close</i></span>
                    <p>Deakin is a young, vibrant and cutting-edge university with great ambitions, and it’s our people that are the embodiment of our culture and the essence of who we are as a brand.</p>
                </div>
            </div>
        )
    }
}
export default UniversityCard;







