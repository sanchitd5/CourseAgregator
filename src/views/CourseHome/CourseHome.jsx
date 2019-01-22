﻿import React, { Component } from 'react';
import Cards from 'components/cards/cards.jsx'
import LoadingComponent from 'components/loading/loading.jsx';
import API from 'helpers/api.js';
import Sidebar from 'components/sidebar/sidebar.jsx';
import M from 'materialize-css';

class CourseHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: 'url()',
            catalogue:[],
            agents:[],
            search:'',
            tempcatalogue:[],
            experience:'experience',
              university:'Deakin',
              fees:'',
              coursetype:'',
              country:'',
            filterationFlag:0,
            searchIsHidden:true,            
            deskSearchIsHidden:true,
            pageCourseType:this.props.location.feild,
        };
      this.filterButtonInit();
    }
  
    initilizeSelector(){
      let selector = document.querySelectorAll('select');
      M.FormSelect.init(selector);
    }

    filterButtonInit()
    {
    let filterElem = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(filterElem);
    }

    deskSearchToggle(){
      if(this.state.deskSearchIsHidden)
      {this.setState({deskSearchIsHidden:false});}
      else
      {this.setState({deskSearchIsHidden:true});}

    }


    searchToggle(){
      if(this.state.searchIsHidden)
      {this.setState({searchIsHidden:false});}
      else
      {this.setState({searchIsHidden:true});}

    }

    updateSearch = (event) => {
      this.setState({search:event.target.value});
      this.courseFilter();  
    }
     componentDidMount() {
        
        this.getCourses();
        this.getAgents();      }
      stateHandler = (state) => {
        this.setState(state);
        this.initilizeSelector();
      }
      
      getCourses = () => {
        API.getCourses(this.stateHandler);
      }
      getAgents = () => {
        API.getAgents(this.stateHandler);
      }
            
      handleexperience = (experience) => {
        this.setState({experience: experience});
      }
      handleuniversity= (university) => {
        this.setState({university: university});
      }
      handlecountry= (country) => {
        this.setState({country: country});
      }

      handlefees= (fees) => {
        this.setState({fees: fees});
      }

      handlecoursetype= (coursetype) => {
        this.setState({coursetype: coursetype});
      }

      courseFilter= (filteredCourses) => {
        filteredCourses=this.state.catalogue.filter(
          (catalogue)=>{
            if(catalogue.coursetype===this.state.pageCourseType)
              {            
                return catalogue.Title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
              }
          })
      this.setState({tempcatalogue:filteredCourses});
      this.setState({filterationFlag:1});
      }
  render() {
   
    if (this.state.catalogue.length === 0) return <LoadingComponent/>;
    if (this.state.agents.length === 0) return <LoadingComponent/>;
    if(this.state.filterationFlag===0)this.courseFilter();
    document.body.style.backgroundImage=this.state.backgroundImage;
    return (
     
      <div className="Courses">
      <br/>
       
          <div className="container">
          {!this.state.searchIsHidden &&
          <div className=" valign-wrapper card-panel row section hoverable hide-on-large-only">
            <div className="col s8">
              <input type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" />
            </div>
            <div className="col s4">
            <Sidebar dataexperience={this.handleexperience} datauniversity={this.handleuniversity} datafees={this.handlefees} datacountry={this.handlecountry} datacoursetype={this.handlecoursetype}/>
            </div>
          </div>}
          
            <div className="row">
              {!this.state.deskSearchIsHidden&&<div className="col l12 s0 m0 hide-on-med-and-down card-panel"><input value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" /></div>}
              <div className="card-panel col l3 s0 m0 hide-on-med-and-down">
              <p className="flow-text">Filters</p>
              <div className="divider"></div><br/>
              <div className="row">
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
                    </div>
              </div>

              <div className="col l7 m12 s12">     
                  {
                    this.state.tempcatalogue.map((value,i) => {
                      return (  
                                      <Cards key={i} showButton="true" data={value} agents={this.state.agents}  Ctype="Cdesc" previousField={this.props.location.feild}/>
                                
                              )
                                                              }
                              
                                                  )
                        }
                        {
                          (!this.state.tempcatalogue.length?
                                                        <div>
                                                        <p className="flow-text">
                                                          Sorry, No Courses with that name found.
                                                        </p>
                                                      </div>
                          :'')
                    }          
              </div>
              <div className="col l2 m0 s0 hide-on-med-and-down">
              

              <Cards Ctype="dummy"/>
              <Cards Ctype="dummy"/>
              <Cards Ctype="dummy"/>
              
              </div>
            </div>
          </div>
          
                <div className="fixed-action-btn hide-on-large-only">
  <a className="btn-floating btn-large red" onClick={()=>{this.searchToggle()}} href="#!">
    <i className="large material-icons">search</i>
  </a></div>
  <div className="fixed-action-btn hide-on-med-and-down">
  <a className="btn-floating btn-large red" onClick={()=>{this.deskSearchToggle()}} href="#!">
    <i className="large material-icons">search</i>
  </a>
</div>
          </div>
         
        );
      }
    }

export default CourseHome;

