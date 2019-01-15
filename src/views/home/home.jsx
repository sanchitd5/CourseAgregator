import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import M from 'materialize-css'
import Cards from 'components/cards/cards';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        coursetypes:[{name:"Computing", desc: "Computing is any activity that uses computers. It includes developing hardware and software, and using computers to manage and process information, communicate and entertain. Computing is a critically important, integral component of modern industrial technology" ,feild: "comp"},
        {name:"Accounting", desc: "Accounting or accountancy is the measurement, processing, and communication of financial information about economic entities such as businesses and corporations. ",feild: "acc"},
        {name:"Health", desc: "Medicine is the science and practice of the diagnosis, treatment, and prevention of disease. Medicine encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illnes", feild: "hel"},
        {name:"Mechinical", desc: "Mechanical engineering is the discipline that applies engineering, physics, engineering mathematics, and materials science principles to design, analyze, manufacture, and maintain mechanical systems.",feild: "m"}]
       
      };
    M.AutoInit();
  }    
  


  componentDidMount(){
  }
  render() {

    return (
      <div className="Home">

      <Parallax bgImage={require('images/bg.jpg')} >
        <div className="container">   
        <p className="flow-text">Select your Course Type</p>
        <br/><div className="row">
        
        <div className="col l6 m9 s12">
         { 
         this.state.coursetypes.map((value,id) => {
                    return (
                            <Cards key={id} Ctype="btn" data={value}/>
                    )
                })}
        </div>
        <div className="col l4 m3 s0 ">
        <p className="flow-text">Advertisments</p>
        <Cards Ctype="dummy"/>
        <Cards Ctype="dummy"/>
        <Cards Ctype="dummy" />
        </div>
        </div>
        </div>  
        </Parallax>
      </div>

    );
  }
}

export default Home;
