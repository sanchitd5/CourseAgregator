import React, { Component } from 'react';
import Cards from 'components/cards/cards.jsx';
import Crousal from 'components/Crousal/crousal.jsx'



class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[{ title: "How to Get Great Letter of Recommendation", desc: "Competitive colleges use the letter of recommendation to assess your passions goals and character. The trick to getting a great letter is planning ahead."},
            { title: "Top 10 College Majors", desc:"Check out our list of the best college majors based on job prospects, alumni salaries, and popularity. Each of these majors offers unique intellectual challenges."}]       
      };
  }    
  


  componentDidMount(){

  }
  render() {


    return (
     <div>
      <Crousal Ctype="fullwidth"/>   
      <div className="divider"></div>
      <br className="hide-on-small-only"/>
      <div className="container">
{
  this.state.data.map((value) => {
    return ( <Cards data={value} agents={this.state.agents}  Ctype="landing"/>)
      })
                                          }       
      </div>
      </div>
    );
  }
}

export default Landing;
