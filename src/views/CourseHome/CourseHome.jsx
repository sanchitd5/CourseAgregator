import React, { Component } from 'react';
import UniversityCard from 'components/cards/universityCards.jsx';
import AdvertisementCard from 'components/cards/advertisementCards.jsx';
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
      search: null,
      tempcatalogue: [],
      university: null,
      fees: null,
      degreelevel: null,
      country: null,
      filterationFlag: 0,
      searchIsHidden: true,
      deskSearchIsHidden: true,
      pageCourseType: this.props.location.feild,
      temppageCourseType: '',
      tempUni: [],
      tempDegree: [],
      tempFee: [],
      tempCountry: [],
      courseData: [],
      interestedCourseId: [],
      filtersLoaded: false,
      searchedCourse: 0,
    };
    window.localStorage.pageCourseType = this.props.location.feild;
    this.loadFilters = this.loadFilters.bind(this);
    this.courseFilter = this.courseFilter.bind(this);
    this.searchCourse = this.searchCourse.bind(this);
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
    API.getCourses(this.stateHandler)
  }
  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  }
  componentDidUpdate() {
    this.initilizeSelector();
    this.initilizeSidenav();
    window.localStorage.setItem("courseData", JSON.stringify(this.state.courseData))
  }
  componentWillMount() {
    this.getCourses();
  }
  componentDidMount() {
  }

  stateHandler = (state) => {
    this.setState(state);

  }

  courseFilter() {
    let filteredCourse;
    this.state.courseData.forEach(course => {
      if (this.state.university !== null) {
        if (this.state.country !== null) {
          if (this.state.university === course.university.name && this.state.country === course.university.location) {
            filteredCourse = course
          }
        }
        else if (this.state.fees !== null) {
          if (this.state.university === course.university.name && this.state.fees === course.fees) {
            filteredCourse = course
          }
        }
        else if (this.state.degreelevel !== null) {
          console.log('------------------------->')
          if (this.state.university === course.university.name && this.state.degreelevel === course.courseLevel) {
            filteredCourse = course
          }
        }
      }
      else if (this.state.country !== null) {
        if (this.state.university !== null)
          if (this.state.country === course.university.location && this.state.university === course.university.name) {
            filteredCourse = course
          }
          else if (this.state.fees !== null) {
            if (this.state.country === course.university.location && this.state.fees === course.fees) {
              filteredCourse = course
            }
          }
          else if (this.state.degreelevel !== null)
            if (this.state.country === course.university.location && this.state.degreelevel === course.courseLevel) {
              filteredCourse = course
            }
      }
      else if (this.state.fees !== null) {
        if (this.state.university !== null)
          if (this.state.fees === course.fees && this.state.university === course.university.name) {
            filteredCourse = course
          }
          else if (this.state.country !== null)
            if (this.state.fees === course.fees && this.state.country === course.university.location) {
              filteredCourse = course
            }
            else if (this.state.degreelevel !== null)
              if (this.state.fees === course.fees && this.state.degreelevel === course.courseLevel) {
                filteredCourse = course
              }
      }
      else if (this.state.degreelevel !== null) {
        if (this.state.university !== null)
          if (this.state.fees === course.fees && this.state.university === course.university.name) {
            filteredCourse = course
          }
          else if (this.state.country !== null)
            if (this.state.fees === course.fees && this.state.country === course.university.location) {
              filteredCourse = course
            }
            else if (this.state.fees !== null)
              if (this.state.fees === course.fees && this.state.degreelevel === course.courseLevel) {
                filteredCourse = course
              }
      }
    })
    console.log('[FILTERED COURSE]', filteredCourse)

    this.setState({
      tempcatalogue: filteredCourse,
      filterationFlag: 1
    });

  }

  loadFilters() {
    let filterUni = [];
    let filterExp = [];
    let filterFee = [];
    let filterCountry = [];
    let filterDegree = [];

    this.state.courseData.forEach((value, key) => {
      if (filterDegree.includes(value.courseLevel) === false)
        filterDegree.push(value.courseLevel)
      if (filterUni.includes(value.university.name) === false)
        filterUni.push(value.university.name)
      if (filterCountry.includes(value.university.location) === false)
        filterCountry.push(value.university.location)
      if (filterFee.includes(value.fees) === false)
        filterFee.push(value.fees)
    });
    if (this.state.filtersLoaded === false)
      this.setState({
        tempUni: filterUni,
        tempExp: filterExp,
        tempCountry: filterCountry,
        tempDegree: filterDegree,
        tempFee: filterFee,
        filtersLoaded: true
      });
  }

  filteration = (data) => {
    console.log('[DATA]', data.target.value)
    if (this.state.filterationFlag === 1)
      this.setState({
        filterationFlag: 0
      })
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

  searchCourse() {
    if (this.state.search) {
      this.setState({
        searchedCourse: 1
      })
    }
  }
  render() {
    if (this.state.courseData.length === 0) return <LoadingComponent />;
    if (this.state.filterationFlag === 0) {
      console.log(this.state.courseData)



      this.loadFilters();
    }
    console.log('ACTIVE FILTERS', this.state.activeFilters)
    document.body.style.backgroundImage = this.state.backgroundImage;
    return (

      <div className="Courses">
        <br />
        <div className="container">
          {!this.state.searchIsHidden &&
            <div className=" row section card-panel hoverable hide-on-large-only">
              <div className="valign-wrapper">
                <div className="col s7">
                  <input type="text" onChange={this.updateSearch} placeholder="Search Courses" />
                </div>
                <div className="col s5">
                  <a href="#!" onClick={this.searchCourse} className=" btn-small red white-text">Search</a>
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
              <div className="col l1 s0 m0"><a href="#!" onClick={this.searchCourse} className="btn red white-text">Search</a></div></div>}
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

            <div className="col l6 m12 s6">

              <div className="">
                {
                  this.state.filterationFlag === 1 ? this.state.tempcatalogue !== undefined ? <UniversityCard data={this.state.tempcatalogue} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard> : <p>No courses match your filters</p> : this.state.courseData.map((value, i) => {
                    return (
                      <UniversityCard data={value} key={i} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
                    )
                  })
                }
                {
                  this.state.searchedCourse !== 0 ? this.state.courseData.forEach((course, i) => {
                    if (course.name.includes(this.state.search)) {
                      return (
                        <UniversityCard data={course} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
                      )
                    }
                    else
                      console.log('[NOT FOUND]', course.university.name.includes(this.state.search))
                  }) : null
                }
              </div>
              {
                (!this.state.courseData.length ?
                  <div>
                    <p className="flow-text">
                      Sorry, No Courses with that name found.
                                                        </p>
                  </div>
                  : '')
              }
            </div>
            <div className="col l3 s0 m0 hide-on-med-and-down">
              <AdvertisementCard></AdvertisementCard>
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

// this.state.courseData.map((value, i) => {
//   console.log('==================>', this.state.tempcatalogue)
//   if (this.state.university !== null && value.university.name === this.state.tempcatalogue)
//     return (
//       <UniversityCard data={value} key={i} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
//     )
//   if (this.state.degreelevel !== null && value.courseLevel === this.state.tempcatalogue)
//     return (
//       <UniversityCard data={value} key={i} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
//     )
//   if (this.state.fees !== null && value.fees === this.state.tempcatalogue)
//     return (
//       <UniversityCard data={value} key={i} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
//     )
//   if (this.state.country !== null && value.university.location === this.state.tempcatalogue)
//     return (
//       <UniversityCard data={value} key={i} parentState={this.state} parentStateHandler={this.stateHandler} ></UniversityCard>
//     )
// })