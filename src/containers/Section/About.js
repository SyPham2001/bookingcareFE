import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import vtvlogo from "../../assets/right-content/vtv1.png";
import suckhoedoisong from "../../assets/right-content/suckhoedoisong.png";
import ictnews from "../../assets/right-content/ictnews.png";
import vnexpress from "../../assets/right-content/vnexpress.png";
import vtcnews from "../../assets/right-content/vtcnews.png";
import cuccntt from "../../assets/right-content/cuc-cong-nghe-thong-tin-bo-y-te-2.png";
import infonet from "../../assets/right-content/infonet.png";
import vtcgo from "../../assets/right-content/vtc.jpg";
class About extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div className="section-share section-about ">
        <div className="section-about-header">
          <FormattedMessage id="homepage.title-about" />
        </div>
        <div className="section-about-content row">
          <div className="content-left col-6">
            <iframe
              width="95%"
              height="350px"
              src="https://www.youtube.com/embed/7tiR7SI4CkI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right col-6">
            <div
              className="ul-right-content"
              style={{ paddingTop: "55px", paddingLeft: "30px" }}
            >
              <div className="ul1 row" style={{ marginLeft: "20px" }}>
                <div className="col-4">
                  <a href="">
                    <img src={suckhoedoisong} alt="" />
                  </a>
                </div>
                <div className="col-4">
                  <a href="">
                    <img
                      src={vtvlogo}
                      alt=""
                      style={{ width: "60%", marginLeft: "-30px" }}
                    />
                  </a>
                </div>
                <div className="col-4">
                  <a href="">
                    <img
                      src={ictnews}
                      alt=""
                      style={{ width: "75%", marginLeft: "-118px" }}
                    />
                  </a>
                </div>
              </div>
              <div className="ul2 row" style={{ padding: "20px 0px" }}>
                <div className="col-4">
                  <a href="">
                    <img src={vnexpress} alt="" style={{ marginTop: 20 }} />
                  </a>
                </div>
                <div className="col-4">
                  <a href="">
                    <img
                      src={vtcnews}
                      alt=""
                      style={{
                        width: "90%",
                        borderRadius: 10,
                        marginLeft: "-38px",
                      }}
                    />
                  </a>
                </div>
                <div className="col-4">
                  <a href="">
                    <img
                      src={cuccntt}
                      alt=""
                      style={{ width: "85%", marginLeft: "-60px" }}
                    />
                  </a>
                </div>
              </div>
              <div className="ul3 row" style={{ marginLeft: "20px" }}>
                <div className="col-3">
                  <a href="">
                    <img src={infonet} alt="" style={{ width: "100%" }} />
                  </a>
                </div>
                <div className="col-3">
                  <a href="">
                    <img
                      src={vtvlogo}
                      alt=""
                      style={{ width: "80%", marginLeft: "-15px" }}
                    />
                  </a>
                </div>
                <div className="col-3">
                  <a href="">
                    <img
                      src={vtcgo}
                      alt=""
                      style={{ width: "110%", marginLeft: "-50px" }}
                    />
                  </a>
                </div>
                <div className="col-3">
                  <a href="">
                    <img
                      src={vtvlogo}
                      alt=""
                      style={{ width: "80%", marginLeft: "-50px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
