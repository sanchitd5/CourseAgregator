import React, { Component } from 'react';
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
            experience:'',
            university:'',
            fees:'',
            coursetype:'',
            country:'',
            filterationFlag:0,
            filterationFlag2:0,
            searchIsHidden:true,            
            deskSearchIsHidden:true,
            pageCourseType:this.props.location.feild,
            tempUni:[],
            tempDegree:[],
            tempFee:[],
            tempCountry:[],
            tempExp:[],
        };
        this.loadFilters=this.loadFilters.bind(this);
      this.filterButtonInit();
    
    }
  
    initilizeSelector(){
      let selector = document.querySelectorAll('select');
      M.FormSelect.init(selector,{coverTrigger:false});
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

    componentWillMount(){
      this.getCourses();
    }
     componentDidMount() {
        this.getAgents();
        
      }
        
      stateHandler = (state) => {
        this.setState(state);
        M.AutoInit();
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

      loadFilters(){
          let filterUni=[];
          let filterExp=[];
          let filterFee=[];
          let filterCountry=[];
          let filterDegree=[];
          
          this.state.catalogue.map((value,key)=>{
            
            if(value.coursetype===this.state.pageCourseType)
              {
                if (filterUni.indexOf(value.University) === -1) {
                  filterUni.push(value.University)
                }
                if (filterDegree.indexOf(value.CourseType) === -1) {
                  filterDegree.push(value.CourseType)
                }
                if (filterExp.indexOf(value.experience) === -1) {
                  filterExp.push(value.experience)
                }
                if (filterFee.indexOf(value.Fees) === -1) {
                  filterFee.push(value.Fees)
                }
                if (filterCountry.indexOf(value.Country) === -1) {
                  filterCountry.push(value.Country)
                }
              }
          });
          this.setState({tempUni:filterUni});
          this.setState({tempExp:filterExp});
          this.setState({tempCountry:filterCountry});
          this.setState({tempDegree:filterDegree});
          this.setState({tempFee:filterFee});
}

  filteration=(data)=>{
      if(data.target.id==="University")
      {
        this.setState({university: data.target.value});
      }
      if(data.target.id==="Experience")
      {
        this.setState({experience: data.target.value});
      }
      if(data.target.id==="Fees")
      {
        this.setState({fees: data.target.value});
      }
      if(data.target.id==="Country")
      {
        this.setState({country: data.target.value});
      }
      if(data.target.id==="CourseType")
      {
        this.setState({coursetype: data.target.value});
      }
      console.log(data.target.id,":",data.target.value); 
  }
  filteration2(){
  }

    
  render() {
    if (this.state.catalogue.length === 0) return <LoadingComponent/>;
    if (this.state.agents.length === 0) return <LoadingComponent/>;
    if(this.state.filterationFlag===0){this.courseFilter();
    this.loadFilters();}
    
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
                  <form onChange={this.filteration}>
                    <div className=" input-field col s12">

                    <select id="University">
                        <option value="true">All</option>
                            {
                              this.state.tempUni&&
                               this.state.tempUni.map((value,key)=>{
                                return( <option key={key} value={value}>{value}</option>)
                              })
                              
                            }
                        </select>
                        <label>University</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="Experience">
                        <option value="true">All</option>
                        {
                              this.state.tempExp&&
                               this.state.tempExp.map((value,key)=>{
                                return( <option key={key} value={value}>{value}</option>)
                              })
                              
                            }
                        </select>
                        <label>Experience in Years</label>
                    </div>
                    <div className="input-field col s12">
                    <select  id="Fees">
                        <option value="true">All</option>
                        {
                              this.state.tempFee&&
                               this.state.tempFee.map((value,key)=>{
                                return( <option key={key} value={value}>{value}</option>)
                              })
                              
                            }
                        </select>
                        <label>Fee Interval(AUD)</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="Country">
                    <option value="true">All</option>
                    {  this.state.tempCountry&&
                               this.state.tempCountry.map((value,key)=>{
                                return( <option key={key} value={value}>{value}</option>)
                              }) 
                            }
                        </select>
                        <label>Country</label>
                    </div>
                    <div className="input-field col s12">
                    <select id="CourseType">
                        <option value="true">All</option> 
                        {  this.state.tempDegree&&
                               this.state.tempDegree.map((value,key)=>{
                                return( <option key={key} value={value}>{value}</option>)
                              }) 
                            }
                        </select>
                        <label>Degree Type</label>
                    </div>
                    </form>
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

