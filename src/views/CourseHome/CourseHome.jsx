import React, { Component } from 'react';
import Cards from 'components/cards/cards.jsx'
import LoadingComponent from 'components/loading/loading.jsx';
import API from 'helpers/api.js';
import M from 'materialize-css';
import 'views/CourseHome/style.scss';

class CourseHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url()',
      catalogue: [],
      agents: [],
      search: '',
      tempcatalogue: [],
      university: "true",
      fees: "true",
      degreelevel: "true",
      country: "true",
      filterationFlag: 0,
      filterationFlag2: 0,
      searchIsHidden: true,
      deskSearchIsHidden: true,
      pageCourseType: this.props.location.feild,
      tempUni: [],
      tempDegree: [],
      tempFee: [],
      tempCountry: [],
      
    };
    this.loadFilters = this.loadFilters.bind(this);
    this.filterButtonInit();
    this.filteration = this.filteration.bind(this);
  }

  initilizeSelector() {
    let selector = document.querySelectorAll('select');
    M.FormSelect.init(selector, { coverTrigger: false });

  }
  initilizeSidenav() {
    let sidenavigator = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavigator, {
      edge: "left",
      inDuration: 250
    });
  }
  filterButtonInit() {
    let filterElem = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(filterElem);
  }

  deskSearchToggle() {
    if (this.state.deskSearchIsHidden) { this.setState({ deskSearchIsHidden: false }); }
    else { this.setState({ deskSearchIsHidden: true }); }

  }

  searchToggle() {
    if (this.state.searchIsHidden) { this.setState({ searchIsHidden: false }); }
    else { this.setState({ searchIsHidden: true }); }

  }
  getCourses = () => {
    API.getCourses(this.stateHandler);
  }
  getAgents = () => {
    API.getAgents(this.stateHandler);
  }
  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  }
  componentDidUpdate() {
    this.initilizeSelector();
    this.initilizeSidenav();

  }
  componentWillMount() {
    this.getCourses();
    this.getAgents();

  }
  componentDidMount() {

  }

  stateHandler = (state) => {
    this.setState(state);

  }

  courseFilter = (filteredCourses) => {
    filteredCourses = this.state.catalogue.filter(
      (catalogue) => {
          if (this.state.country === "true" || catalogue.Country === this.state.country) {
            if (this.state.fees === "true" || catalogue.Fees === this.state.fees) {
              if (this.state.degreelevel === "true" || catalogue.degreelevel === this.state.degreelevel) {
                if (this.state.university === "true" || catalogue.University === this.state.university) {
                  if (catalogue.coursetype === this.state.pageCourseType) {
                    if (this.state.search === '' || catalogue.Title.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1) {
                      return catalogue.Title;
                    }
                  }
                }
              }
            }
          }
        }
      
    )
    this.setState({ tempcatalogue: filteredCourses });
    this.setState({ filterationFlag: 1 });
  }

  loadFilters() {
    let filterUni = [];
    let filterExp = [];
    let filterFee = [];
    let filterCountry = [];
    let filterDegree = [];

    this.state.catalogue.forEach((value, key) => {

      if (value.coursetype === this.state.pageCourseType) {
        if (filterUni.indexOf(value.University) === -1) {
          filterUni.push(value.University)
        }
        if (filterDegree.indexOf(value.degreelevel) === -1) {
          filterDegree.push(value.degreelevel)
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
    this.setState({ tempUni: filterUni });
    this.setState({ tempExp: filterExp });
    this.setState({ tempCountry: filterCountry });
    this.setState({ tempDegree: filterDegree });
    this.setState({ tempFee: filterFee });
  }

  filteration = (data) => {

    if (data.target.id === "University" | data.target.id === "University-sidenav") {
      this.setState({ university: data.target.value });
    }
    if (data.target.id === "Fees" || data.target.id === "Fees-sidenav") {
      this.setState({ fees: data.target.value });
    }
    if (data.target.id === "Country" || data.target.id === "Country-sidenav") {
      this.setState({ country: data.target.value });
    }
    if (data.target.id === "DegreeLevel" || data.target.id === "DegreeLevel-sidenav") {
      this.setState({ degreelevel: data.target.value });
    }
  }


  render() {
    if (this.state.catalogue.length === 0) return <LoadingComponent />;
    if (this.state.agents.length === 0) return <LoadingComponent />;
    if (this.state.filterationFlag === 0) {
      this.courseFilter();
      this.loadFilters();
    }

    document.body.style.backgroundImage = this.state.backgroundImage;
    return (

      <div className="Courses">
        <br />
        <div className="container">
          {!this.state.searchIsHidden &&
            <div className=" row section card-panel hoverable hide-on-large-only">
              <div className="valign-wrapper">
                <div className="col s8">
                  <input type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" />
                </div>
                <div className="col s4">
                  <a href="#!" onClick={this.courseFilter} className=" btn-small red white-text">Search</a>
                </div>
              </div>
              <div className="col s12 left-align">


                <div id="slide-out" className="sidenav section container">
                  <div className="container">
                    <p className="flow-text center-align strong">Filters</p>
                    <div className="divider"></div><br />
                    <div className="row">
                      <form className="center-align" onChange={this.filteration}>
                        <div className=" input-field col s12">

                          <select id="University-sidenav">
                            <option value="true">All</option>
                            {
                              this.state.tempUni &&
                              this.state.tempUni.map((value, key) => {
                                return (<option key={key} value={value}>{value}</option>)
                              })

                            }
                          </select>
                          <label>University</label>
                        </div>
                        
                        <div className="input-field col s12">
                          <select id="Fees">
                            <option value="true">All</option>
                            {
                              this.state.tempFee &&
                              this.state.tempFee.map((value, key) => {
                                return (<option key={key} value={value}>{value}</option>)
                              })

                            }
                          </select>
                          <label>Fee Interval(AUD)</label>
                        </div>
                        <div className="input-field col s12">
                          <select id="Country-sidenav">
                            <option value="true">All</option>
                            {this.state.tempCountry &&
                              this.state.tempCountry.map((value, key) => {
                                return (<option key={key} value={value}>{value}</option>)
                              })
                            }
                          </select>
                          <label>Country</label>
                        </div>
                        <div className="input-field col s12">
                          <select id="DegreeLevel-sidenav">
                            <option value="true">All</option>
                            {this.state.tempDegree &&
                              this.state.tempDegree.map((value, key) => {
                                return (<option key={key} value={value}>{value}</option>)
                              })
                            }
                          </select>
                          <label>Degree Type</label>
                        </div>
                        <a href="#!" className="btn red white-text " onClick={this.courseFilter}>Filter</a>
                      </form>
                    </div>
                  </div>

                </div>
                <a href="#!" data-target="slide-out" className=" sidenav-trigger grey-text">Advance Filters</a>


              </div>
            </div>
          }
          <div className="row">
            {!this.state.deskSearchIsHidden && <div className="valign-wrapper card-panel row hide-on-med-and-down hoverable"><div className="col l11 s0 m0"><input value={this.state.search} onChange={this.updateSearch} placeholder="Search Courses" /></div>
              <div className="col l1 s0 m0"><a href="#!" onClick={this.courseFilter} className="btn red white-text">Search</a></div></div>}
            <div className="card-panel pin-top col l3 s0 m0 hide-on-med-and-down">
              <p className="flow-text">Filters</p>
              <div className="divider"></div><br />
              <div className="row">
                <form onChange={this.filteration}>
                  <div className=" input-field col s12">

                    <select id="University">
                      <option value="true">All</option>
                      {
                        this.state.tempUni &&
                        this.state.tempUni.map((value, key) => {
                          return (<option key={key} value={value}>{value}</option>)
                        })

                      }
                    </select>
                    <label>University</label>
                  </div>

                  <div className="input-field col s12">
                    <select id="Fees">
                      <option value="true">All</option>
                      {
                        this.state.tempFee &&
                        this.state.tempFee.map((value, key) => {
                          return (<option key={key} value={value}>{value}</option>)
                        })

                      }
                    </select>
                    <label>Fee Interval(AUD)</label>
                  </div>
                  <div className="input-field col s12">
                    <select id="Country">
                      <option value="true">All</option>
                      {this.state.tempCountry &&
                        this.state.tempCountry.map((value, key) => {
                          return (<option key={key} value={value}>{value}</option>)
                        })
                      }
                    </select>
                    <label>Country</label>
                  </div>
                  <div className="input-field col s12">
                    <select id="DegreeLevel">
                      <option value="true">All</option>
                      {this.state.tempDegree &&
                        this.state.tempDegree.map((value, key) => {
                          return (<option key={key} value={value}>{value}</option>)
                        })
                      }
                    </select>
                    <label>Degree Type</label>
                  </div>
                  <a href="#!" className="btn red white-text" onClick={this.courseFilter}>Filter</a>
                </form>
              </div>
            </div>

            <div className="col l7 m12 s12">
              <div className="">
                {
                  this.state.tempcatalogue.map((value, i) => {
                    return (
                      <Cards key={i} showButton="true" data={value} agents={this.state.agents} Ctype="CdescNEW" previousField={this.props.location.feild} />
                    )
                  }
                  )
                }
              </div>
              {
                (!this.state.tempcatalogue.length ?
                  <div>
                    <p className="flow-text">
                      Sorry, No Courses with that name found.
                                                        </p>
                  </div>
                  : '')
              }
            </div>
            <div className="col l2 m0 s0 hide-on-med-and-down">
              <Cards Ctype="dummy" />
              <Cards Ctype="dummy" />
              <Cards Ctype="dummy" />
            </div>
          </div>
        </div>

        <div className="fixed-action-btn hide-on-large-only">
          <a className="btn-floating btn-large red" onClick={() => { this.searchToggle() }} href="#!">
            <i className="large material-icons">search</i>
          </a></div>
        <div className="fixed-action-btn hide-on-med-and-down">
          <a className="btn-floating btn-large red" onClick={() => { this.deskSearchToggle() }} href="#!">
            <i className="large material-icons">search</i>
          </a>
        </div>
      </div>

    );
  }
}

export default CourseHome;

