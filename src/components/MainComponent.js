import React from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PageLoader from "./PageLoader";
import HomeComponent from "./HomeComponent";
import GoogleFontLoader from "react-google-font-loader";
import 'adminbsb-materialdesign/css/themes/all-themes.css';

class MainComponent extends React.Component{

    state = {
        bodyClass: "theme-red ls-closed",
        displayOverlay: "none",
        width: window.screen.width,
    };

    onBarClick = () => {
        if (this.state.bodyClass === "theme-red ls-closed overlay-open") {
            this.setState({ bodyClass: "theme-red ls-closed" });
            this.setState({ displayOverlay: "none" });
        } else if (this.state.bodyClass === "theme-red ls-closed") {
            this.setState({ bodyClass: "theme-red ls-closed overlay-open" });
            this.setState({ displayOverlay: "block" });
        }
    };

    render() {

       if(window.screen.width>1150){
           document.getElementById("root").className="theme-red";
       }
       else {
           document.getElementById("root").className=this.state.bodyClass;
       }


        return (

            <React.Fragment>

                <GoogleFontLoader fonts={[
                    {
                        font: 'Roboto',
                        weights: [400, 700],
                    },

                ]}
                                  subsets={['latin','cyrillic-ext']}
                />

                <GoogleFontLoader fonts={[
                    {
                        font: 'Material+Icons'
                    },

                ]}
                />
                <Overlay display={this.state.displayOverlay}/>
                <Navbar onBarClick={this.onBarClick}/>
                <Sidebar/>
                <HomeComponent/>
            </React.Fragment>
        );
    }
}

export default MainComponent;