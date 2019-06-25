import React, { Component } from 'react';
import LoadingComponent from 'components/loading/loading.jsx';
import { Link } from 'react-router-dom'
import AppHelper from "helpers/AppHelper.js";
class ApplicationStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }

      stateHandler = (temp) => {
        this.setState(temp)
      }

      getItemHistoryDetails = () => {
        //API.getItemHistory(this.state, this.stateHandler);

      }

      getMonthString = (value) => {
          let result;
          switch(value){
                case 1:
                    result = "January";
                    break;
                case 2:
                    result = "February";
                    break;
                case 3:
                    result = "March";
                    break;
                case 4:
                    result = "April";
                    break;
                case 5:
                    result = "May";
                    break;
                case 6:
                    result = "June";
                    break;
                case 7:
                    result = "July";
                    break;
                case 8:
                    result = "August";
                    break;
                case 9:
                    result = "September";
                    break;
                case 10:
                    result = "October";
                    break;
                case 11:
                    result = "November";
                    break;
                default:
                    result = "December";
                    break
          }
          return result;
      }

      componentDidMount(){
        //this.getItemHistoryDetails()
      }

      componentWillUpdate(){
       
        
      }


      componentDidUpdate(){
      }
  


  render() {
    let statusarry = []
    if(this.props.location.state.status === undefined) return <LoadingComponent></LoadingComponent>

    this.props.location.state.status.forEach(element => {
      if (element.courseId._id === this.props.location.state.trackUniversity) {
        statusarry.push(element.status)
      }
    });
    console.log(statusarry)
    return (
        <div className="page">
        <div className="page__demo">
          <div className="main-container page__container">
            <div className="timeline">
              <div className="timeline__group">
                <span className="timeline__year">Submitted</span>
                {statusarry[0].map( (element, key) => {
                    return(
                      <div className="timeline__box" key={key}>
                      <div className="timeline__date">
                        <span className="timeline__day">{new Date(element.submittedon).getDay()}</span>
                        <span className="timeline__month">{this.getMonthString(new Date(element.submittedon).getMonth())}</span>
                      </div>
                      <div className="timeline__post">
                        <div className="timeline__content">
                          <p>{element.status}</p>
                        </div>
                      </div>
                      </div>
                    )
                })
                }
              </div>
            </div>
            {AppHelper.isUserLocalStorageLoggedIn() ? <Link to='/Profile' className="btn-floating btn-large waves-effect waves-light"><i className="whtie-text material-icons">arrow_back</i></Link> : <Link to='/Agent' className="waves-effect waves-light btn"><i className="whtie-text material-icons">arrow_back</i></Link>}
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationStatus;