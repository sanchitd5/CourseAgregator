    import React, { Component } from "react";
    import M from 'materialize-css';

    class Sidebar extends Component {
        constructor(props) {
            super(props);
            this.state = {
            universty:'Deakin',
            experience:'5',
            fees:'500000',
            country:'USA',
            coursetype:'Master'
            }
            this.updateExperience=this.updateExperience.bind(this)
            this.handleExperienceChange=this.handleExperienceChange.bind(this)
            
            this.updateUniversity=this.updateUniversity.bind(this)
            this.handleUniversityChange=this.handleUniversityChange.bind(this)
        

            this.updateFees=this.updateFees.bind(this)
            this.handleFeesChange=this.handleFeesChange.bind(this)
        

            this.updateCountry=this.updateCountry.bind(this)
            this.handleCountryChange=this.handleCountryChange.bind(this)
            
            
            
            this.updateCourseType=this.updateCourseType.bind(this)
            this.handleCourseTypeChange=this.handleCourseTypeChange.bind(this)
        
        }
        initilizeSelector(){
            let selector = document.querySelectorAll('select');
            M.FormSelect.init(selector);
        }

        componentDidMount() {
            let elem = document.querySelector(".sidenav");
            M.Sidenav.init(elem, {
                edge: "left",
                inDuration: 250
            });
            this.initilizeSelector();
          }

        //set the state but its not updated
        updateExperience = (event) => {
            this.setState({experience:event.target.value});
        }
        updateUniversity = (event) => {
            this.setState({universty:event.target.value});
        }
        updateFees = (event) => {
            this.setState({fees:event.target.value});
        }
        updateCountry = (event) => {
            this.setState({country:event.target.value});
        }
        updateCourseType = (event) => {
            this.setState({coursetype:event.target.value});
        }


        componentDidUpdate(prevProps, prevState) {
            let _experience=1;
            let _university=1;
            let _fees=1;
            let _country=1;
            let _courseType=1;
            if (prevState.experience!==this.state.experience) {
                this.setState ({experience:this.state.experience},this.handleExperienceChange(_experience))
            }
            if(prevState.university!==this.state.university){
                this.setState({universty:this.state.university},this.handleUniversityChange(_university))
            }
            if(prevState.fees!==this.state.fees){
                this.setState({fees:this.state.fees},this.handleFeesChange(_fees))
            }
            if(prevState.country!==this.state.country){
                this.setState({country:this.state.country},this.handleCountryChange(_country))
            }
            if(prevState.coursetype!==this.state.coursetype){
                this.setState({coursetype:this.state.coursetype},this.handleCourseTypeChange(_courseType))
            }
        }
        
    //Once the state is changed than it forwards the updated state
        handleExperienceChange = (_experience) => {
            if(_experience===1)
            {
            let Experience=this.state.experience;
            this.props.dataexperience(Experience)  
            }        
        }
        
        handleUniversityChange = (_university) => {
            if(_university===1)
            {
            let University=this.state.universty;
            this.props.datauniversity(University)  
            }        
        }
    
        handleFeesChange = (_fees) => {
            if(_fees===1)
            {
            let Fees=this.state.fees;
            this.props.datafees(Fees)  
            }        
        }
        handleCountryChange = (_country) => {
            if(_country===1)
            {
            let Country=this.state.country;
            this.props.datacountry(Country)  
            }        
        }
        handleCourseTypeChange = (_courseType) => {
            if(_courseType===1)
            {
            let CourseType=this.state.coursetype;
            this.props.datacoursetype(CourseType)  
            }        
        }



    
    //for handling two 
        onChangedExperience = (event) =>{
            this.handleExperienceChange();
            this.updateExperience(event);
            
        }

        onChangedUniversity= (event) =>{
            this.handleUniversityChange();
            this.updateUniversity(event);
            
        }
    
        onChangedFees = (event) =>{
            this.handleFeesChange();
            this.updateFees(event);
            
        }
        onChangedCountry = (event) =>{
            this.handleCountryChange();
            this.updateCountry(event);
            
        }
        onChangedCourseType = (event) =>{
            this.handleCourseTypeChange();
            this.updateCourseType(event);
            
        }
        
        
        render() {
            
        
            return (
                <div>
                    <div id="slide-out" className="sidenav">
                    <div>
                     <br/>   
                    </div>
                    <form>
                    <div className=" input-field col s12">
                    <select id="University" onChange={this.onChangedUniversity}>
                        <optgroup label="University">
                            <option value="Deakin">Deakin</option>
                            <option value="RMIT">RMIT</option>
                        </optgroup>
                        </select>
                        <label>University</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="Experience" onChange={this.onChangedExperience}>
                        <optgroup label="Experience">
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </optgroup>
                        </select>
                        <label>Experience in Years</label>
                    </div>
                    <div className="input-field col s12">
                    <select  id="Fees" onChange={this.onChangedFees}>
                        <optgroup label="Fees">
                            <option value="500000">450000 to 550000</option>
                            <option value="600000">550000 to 650000</option>
                        </optgroup>
                        </select>
                        <label>Fee Interval(AUD)</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="Country" onChange={this.onChangedCountry}>
                        <optgroup label="Country">
                            <option value="USA">USA</option>
                            <option value="Pakistan">Pakistan</option>
                        </optgroup>
                        </select>
                        <label>Country</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="CourseType" onChange={this.onChangedCourseType}>
                        <optgroup label="Course Type">
                            <option value="Master">Master</option>
                            <option value="PHD">PHD</option>
                            <option value="Bachelor">Bachelor</option>
                        </optgroup>
                        </select>
                        <label>Degree Type</label>
                    </div>
                    </form>
                    </div>
                    <a href="#!" data-target="slide-out" className="red white-text btn sidenav-trigger">
                    Filter</a>
                </div>
            );
        }
    }

    export default Sidebar;