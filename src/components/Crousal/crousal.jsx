import React, { Component } from 'react';
import M from 'materialize-css';

class Crousal extends Component{
    constructor(props) {
        super(props);
        
        this.state={};
      }
    initilizeCrousal(){
        let crousal = document.querySelectorAll('.carousel');
        M.Carousel.init(crousal,{fullWidth:true});
    }

    componentDidUpdate(){
    this.initilizeCrousal();        
    }
    componentDidMount()
    {
    this.initilizeCrousal();
    }
    render()
    {
        if(this.props.Ctype==="fullwidth"){
        return(
        <div className="carousel carousel-slider">
        <a className="carousel-item" href="#one!"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80" alt='image2'/></a>
        <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2" alt='image3' /></a>
        <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3" alt='image4'/></a>
        <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4" alt='image5'/></a>
        <a className="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5" alt='image6'/></a>
        </div>);}else
        {
            return(
                <div className="carousel">
        <a className="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1" alt='image22'/></a>
        <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2" alt='image33' /></a>
        <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3" alt='image44'/></a>
        <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4" alt='image55'/></a>
        <a className="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5" alt='image11'/></a>
        </div>);
        }
    }
}

export default Crousal;