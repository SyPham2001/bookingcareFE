import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { withRouter } from "react-router";
import LoadingOverlay from "react-loading-overlay";
import { getAllSpecialty } from "../../services/userService";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.setState({
      isShowLoading: true,
    });
    let { language } = this.props;
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
        isShowLoading: false,
      });
    }
    console.log("res", res);
  }
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };

  render() {
    let { dataSpecialty } = this.state;
    console.log("sy check state", dataSpecialty);
    return (
      <>
        <div className="section-share section-specialty ">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.common-specialty" />
              </span>

              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="section-customize specialty-child "
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-image section-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>

                        <div
                          className="specialty-name"
                          style={{ paddingTop: 3 }}
                        >
                          {item.name}
                        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
