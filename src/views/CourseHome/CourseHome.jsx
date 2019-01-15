import React, { Component } from 'react';
import Cards from 'components/cards/cards.jsx'
import LoadingComponent from 'components/loading/loading.jsx';
import API from 'helpers/api.js';
import Sidebar from 'components/sidebar/sidebar.jsx';
import M from 'materialize-css'

class CourseHome extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            catalogue:[],
            agents:[],
            search:'',
            tempcatalogue:[],
            filteration: {experience:'experience',
              university:'Deakin',
              fees:'',
              coursetype:'',
              country:''},
            filterationFlag:0,
            searchIsHidden:true            
          
        };
      this.filterButtonInit();
       
    }
  
    filterButtonInit()
    {
    let filterElem = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(filterElem);
    
    }


    searchToggle(){
      if(this.state.searchIsHidden)
      {this.state.searchIsHidden=false;}
      else
      {this.state.searchIsHidden=true;}

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
      }
    
      getCourses = () => {
        API.getCourses(this.stateHandler);
      }
      getAgents = () => {
        API.getAgents(this.stateHandler);
      }
            
      handleexperience = (experience) => {
        this.filteration.setState({experience: experience});
      }
      handleuniversity= (university) => {
        this.filteration.setState({university: university});
      }
      handlecountry= (country) => {
        this.filteration.setState({country: country});
      }

      handlefees= (fees) => {
        this.filteration.setState({fees: fees});
      }

      handlecoursetype= (coursetype) => {
        this.filteration.setState({coursetype: coursetype});
      }

      courseFilter= (filteredCourses) => {
        filteredCourses=this.state.catalogue.filter(
          (catalogue)=>{
            return catalogue.Title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          })
      this.setState({tempcatalogue:filteredCourses});
      this.setState({filterationFlag:1});
      }
  render() {
   
    if (this.state.catalogue.length === 0) return <LoadingComponent/>;
    if (this.state.agents.length === 0) return <LoadingComponent/>;
    if(this.state.filterationFlag===0)this.courseFilter();
    return (
     
      <div className="Courses">
      <br/>
      
        
          <div className="container">
          {this.state.searchIsHidden &&
          <div className="card-panel hide-on-large-only">
            <div className="row"><div className="col s8">
              <input type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" />
            </div>
            
            <div className="col s4">
            <Sidebar dataexperience={this.handleexperience} datauniversity={this.handleuniversity} datafees={this.handlefees} datacountry={this.handlecountry} datacoursetype={this.handlecoursetype}/>
            </div>
          </div></div>}
          
            <div className="row">
              <div className="col l12 s0 m0 hide-on-med-and-down card-panel hide"><input value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" /></div>
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
                    this.state.tempcatalogue.map((value) => {
                      
                      return (  <div>
                                      <Cards showButton="true" data={value} agents={this.state.agents}  Ctype="Cdesc" previousField={this.props.location.feild}/>
                                </div>
                              )
                                                              }
                              
                                                  )
                        }
                        {
                          (!this.state.tempcatalogue.length?
                                                        <div>
                                                        <p>
                                                          Sorry, No Courses with that name found.
                                                        </p>
                                                      </div>
                          :'')
                    }          
              </div>
              <div className="card-panel col l2 m0 s0 hide-on-med-and-down">
              Dummy Content

              <Cards/>
              
              </div>
            </div>
          </div>
          
                <div className="fixed-action-btn hide-on-large-only">
  <a className="btn-floating btn-large red" onClick={this.searchToggle()} href="#!">
    <i className="large material-icons">search</i>
  </a>
</div>
          </div>
         
        );
      }
    }

export default CourseHome;

