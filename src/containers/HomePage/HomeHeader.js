import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };
  render() {
    let language = this.props.language;
    // console.log("check language", language);
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>

            <div className="center-content">
              <div className="child-content">
                <div className="title-child-content">
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="des-child-content">
                  <p>
                    <FormattedMessage id="home-header.searchdoctor" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div className="title-child-content">
                  <b>
                    <FormattedMessage id="home-header.healthfacilities" />
                  </b>
                </div>
                <div className="des-child-content">
                  <p>
                    <FormattedMessage id="home-header.choosehospitalclinic" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div className="title-child-content">
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="des-child-content">
                  <p>
                    {" "}
                    <FormattedMessage id="home-header.chooseagooddoctor" />
                  </p>
                </div>
              </div>
              <div className="child-content">
                <div className="title-child-content">
                  <b>
                    {" "}
                    <FormattedMessage id="home-header.examinationpackage" />
                  </b>
                </div>
                <div className="des-child-content">
                  <p>
                    {" "}
                    <FormattedMessage id="home-header.generalhealthcheck" />
                  </p>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>{" "}
                <FormattedMessage id="home-header.support" />
              </div>
              <div className="language ">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vn"
                  }
                >
                  <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                    VI
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-banner-gradient">
          {this.props.isShowBanner === true && (
            <div className="home-header-banner">
              <div className="content-up">
                <div className="bg-banner-gradient"></div>
                <div className="title1">
                  <FormattedMessage id="banner.title1" />
                </div>
                <div className="title2">
                  {" "}
                  <FormattedMessage id="banner.title2" />
                </div>
                <div className="search">
                  <i className="fas fa-search" />
                  <input
                    type="text"
                    placeholder={
                      language === LANGUAGES.VI
                        ? "Tìm chuyên khoa"
                        : "Find a specialty"
                    }
                  />
                </div>
                <div className="social-banner">
                  <div className="ggplay"></div>
                  <div className="appstore"></div>
                </div>
              </div>
              <div className="content-down">
                <div className="options">
                  <div className="option-child">
                    <div className="img-child1">
                      <div className="icon-child1"></div>
                    </div>
                    <div className="text-child">
                      {" "}
                      <FormattedMessage id="banner.child1" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child2">
                      <div className="icon-child2"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child2" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child3">
                      <div className="icon-child3"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child3" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child4">
                      <div className="icon-child4"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child4" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child5">
                      <div className="icon-child5"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child5" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child6">
                      <div className="icon-child6"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child6" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child7">
                      <div className="icon-child7"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child7" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="img-child8">
                      <div className="icon-child8"></div>
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="banner.child8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
