import React, { Component } from 'react';
import Cards from 'components/cards/cards';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: 'url()',
      coursetypes: [{ name: "Computing", desc: "Computing is any activity that uses computers. It includes developing hardware and software, and using computers to manage and process information, communicate and entertain. Computing is a critically important, integral component of modern industrial technology", feild: "comp" },
      { name: "Accounting", desc: "Accounting or accountancy is the measurement, processing, and communication of financial information about economic entities such as businesses and corporations. ", feild: "acc" },
      { name: "Health", desc: "Medicine is the science and practice of the diagnosis, treatment, and prevention of disease. Medicine encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illnes", feild: "health" },
      { name: "Mechinical", desc: "Mechanical engineering is the discipline that applies engineering, physics, engineering mathematics, and materials science principles to design, analyze, manufacture, and maintain mechanical systems.", feild: "mech" }]
    };
  }



  componentDidMount() {
  }
  render() {

    document.body.style.backgroundImage = this.state.backgroundImage;
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col l6 m9 s12">
              {
                this.state.coursetypes.map((value, id) => {
                  return (
                    <Cards key={id} Ctype="btn" data={value} />
                  )
                })}
            </div>
            <div className="col l4 m3 s0 ">
              <Cards Ctype="dummy" />
              <Cards Ctype="dummy" />
              <Cards Ctype="dummy" />
            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default Home;
