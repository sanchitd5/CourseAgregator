import React, { Component } from 'react';
import Card from 'components/card/card.jsx';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { name: "Masters of IT", fee: 40000, coursetype: "comp", uni: "Deakin University", description: "MIT Deakin Dummy Decription" },
        { name: "Masters of IT", fee: 40000, coursetype: "comp", uni: "RMIT", description: "MIT RMIT Dummy Decription" },
        { name: "Masters of BA", fee: 40000, coursetype: "acc", uni: "RMIT", description: "MBA RMIT Dummy Decription" }],
      tempcoures: [],
      filteroptions: { degreetype: "default" }
    }
  }
  courseFilter = () => {
    let all_courses = this.state.courses;
  }

  render() {
    console.log(this.props.location.feild)
    return (
      <div className="Home">
        <br />
        <main className="container">
          <div className="row">
            <div className="col s4">
              <div className="input-field col s12">
                <select value={this.state.filteroptions.degreetype}>
                  <option value="default" disabled>Choose your option</option>
                  <option value="bachelors">Option 1</option>
                  <option value="masters">Option 2</option>
                  <option value="phd">Option 3</option>
                </select>
                <label>Degree Type</label>
              </div>
            </div>
            <div class="col s8">
              {this.state.courses.map((value, id) => {
                return (
                  <Card key={id} data={value} Ctype="Cdesc" previousField={this.props.location.feild} />
                )
              })}
            </div>
          </div>
        </main>
      </div>

    );
  }
}

export default Course;