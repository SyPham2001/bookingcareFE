import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "../Section/Specialty";
import MedicalFacilities from "../Section/MedicalFacilities";
import HandBook from "../Section/HandBook";
import OutStandingDoctor from "../Section/OutStandingDoctor";
import About from "../Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingOverlay from "react-loading-overlay";

class HomePage extends Component {
  componentDidMount() {}
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };
    let settingsHandbook = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacilities settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settingsHandbook} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
