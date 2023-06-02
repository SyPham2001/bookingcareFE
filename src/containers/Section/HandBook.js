import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllHandbook } from "../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";
import LoadingOverlay from "react-loading-overlay";
import "./Handbook.scss";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
    console.log("res", res);
  }
  handleViewDetailHandbook = (item) => {
   
    this.props.history.push(`/detail-handbook/${item.id}`);
  };
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let { dataHandbook } = this.state;
    
    return (
      <>
        <div className="section-share section-handbook ">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.hand-book" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.all-posts" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataHandbook &&
                  dataHandbook.length > 0 &&
                  dataHandbook.map((item, index) => {
                    return (
                      <div
                        className="section-customize handbook-child "
                        key={index}
                        onClick={() => this.handleViewDetailHandbook(item)}
                      >
                        <div
                          className="bg-image section-handbook"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>

                        <div
                          className="handbook-name"
                          style={{ paddingTop: 3 }}
                        >
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
                {/* <div className="section-customize ">
                <div className="bg-image section-handbook"></div>
                <div>Cơ xương khớp 1</div>
              </div> */}
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
