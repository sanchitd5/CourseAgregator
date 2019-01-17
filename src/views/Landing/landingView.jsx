import React, { Component } from 'react';
import Cards from 'components/cards/cards.jsx';
import Crousal from 'components/Crousal/crousal.jsx'



class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url()',
      data:[{ title: "How to Get Great Letter of Recommendation", desc: "Competitive colleges use the letter of recommendation to assess your passions goals and character. The trick to getting a great letter is planning ahead."},
            { title: "Top 10 College Majors", desc:"Check out our list of the best college majors based on job prospects, alumni salaries, and popularity. Each of these majors offers unique intellectual challenges."},
            { title: "Merit Scholarships for SAT and ACT Scores", desc: "As more and more colleges go test optional, you might be wondering if you need to sit for the SAT or ACT at all. From guaranteed scholarships to merit scholarships, learn how better SAT and ACT scores can earn you big financial aid awards"},
            { title: "Top 10 College Majors", desc:"Check out our list of the best college majors based on job prospects, alumni salaries, and popularity. Each of these majors offers unique intellectual challenges."}]       
      };
  }    
  


  componentDidMount(){

  }
  render() {
    document.body.style.backgroundImage=this.state.backgroundImage;

    return (
     <div>
      <Crousal Ctype="fullwidth"/>   
      <div className="divider"></div>
      
      <div className="container">
      <br/>
      <br className="hide-on-small-only"/>
{
  this.state.data.map((value,i) => {
    return ( <Cards key={i} data={value} agents={this.state.agents}  Ctype="landing"/>)
      })
}       
      </div>
      </div>
    );
  }
}

export default Landing;
