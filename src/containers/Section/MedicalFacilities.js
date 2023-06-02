import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./MedicalFacilities.scss";
import Slider from "react-slick";
import { withRouter } from "react-router";
import { getAllClinic } from "../../services/userService";
import LoadingOverlay from "react-loading-overlay";
class MedicalFacilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let res = await getAllClinic();
    
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    
    this.props.history.push(`/detail-clinic/${item.id}`);
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { dataClinics } = this.state;
    console.log("sy chk state", this.state);
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstandingmedicalfacilities" />
              </span>

              <button className="btn-section">
                <FormattedMessage id="homepage.search" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        className="section-customize clinic-child"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-image section-medical-facility"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>

                        <div className="clinic-name">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities)
);
