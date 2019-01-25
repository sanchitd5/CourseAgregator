
import React, { Component } from 'react';
import DeakinLogo from 'images/universities/0001.png';
import RMITLogo from 'images/universities/0002.png';
import ChitkaraLogo from 'images/universities/0003.png';
import IITLogo from 'images/universities/0004.png';
import HarvardLogo from 'images/universities/0005.png';
import StanfordLogo from 'images/universities/0006.png';


class UniLOGO extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UniName: "",
            UniLOGOdb:
                [{ title: "deakin university", logo: DeakinLogo},
                { title: "deakin", logo: DeakinLogo },
                { title: "rmit", logo: RMITLogo },
                { title: "chitkara university", logo: ChitkaraLogo },
                { title: "iit", logo: IITLogo },
                { title: "harvard university", logo: HarvardLogo },
                { title: "stanford university", logo: StanfordLogo },],
            tempLOGO:"",
        };
        this.logoSearch=this.logoSearch.bind(this);
    }

    logoSearch(){
        this.state.UniLOGOdb.forEach((value)=>{
            if(value.title.indexOf(this.props.uniname.toLowerCase())>=0)
            {
                this.setState({tempLOGO :value.logo});
                
            }
        });
    }
    componentWillMount(){
        this.logoSearch();
    };

    render() {
        return (<div>
            <img src={this.state.tempLOGO} height="auto" width="70%" alt={this.state.tempLOGO}/>
            </div>);
      }

}

export default UniLOGO;