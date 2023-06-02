import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../containers/HomePage/HomeHeader";
import Home from "../../routes/Home";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { errCode, statusVerify } = this.state;

    return (
      <>
        <HomeHeader />
        {statusVerify === false ? (
          <div>Loading data...</div>
        ) : (
          <div>
            {errCode === 0 ? (
              <>
                <div className="title mt-3 content-verify">
                  <FormattedMessage id="patient.verify-booking.success" />
                </div>
                <div className="img-content">
                  <img
                    src="https://cdn.dribbble.com/users/129972/screenshots/3964116/75_smile.gif"
                    alt=""
                  />
                </div>
              </>
            ) : (
              <>
                <div className="title mt-3 content-verify">
                  <FormattedMessage id="patient.verify-booking.fail" />
                </div>
                <div className="img-content">
                  <img
                    src="https://i.pinimg.com/originals/19/6b/64/196b646fee96beac0d7ac84dc891843c.gif"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
