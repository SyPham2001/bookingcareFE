import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { getProfileDoctorById } from "../../../services/userService";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
      console.log("profiledoctor check data DoctorId", data);
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
   

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {this.capitalizeFirstLetter(date)}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.freeBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    
    let { dataProfile } = this.state;
    console.log("check state in ProfleDoctor", this.state);
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor-modal">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <div className="view-infor-doctor">
              <Link to={`/detail-doctor/${doctorId}`}>
                {" "}
                <FormattedMessage id="homepage.more-info" />
              </Link>
            </div>

            <div className="view-position">
              <i className="fa-solid fa-location-dot" />
              {dataProfile &&
              dataProfile.Doctor_Infor &&
              dataProfile.Doctor_Infor.provinceTypeData &&
              language === LANGUAGES.VI
                ? dataProfile.Doctor_Infor.provinceTypeData.valueVi
                : ""}
              {dataProfile &&
              dataProfile.Doctor_Infor &&
              dataProfile.Doctor_Infor.provinceTypeData &&
              language === LANGUAGES.EN
                ? dataProfile.Doctor_Infor.provinceTypeData.valueEn
                : ""}
            </div>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.booking-modal.price" />
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.VI && (
                <NumberFormat
                  thousandSeparator={true}
                  displayType={"text"}
                  suffix={"VNĐ"}
                  value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                />
              )}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.EN && (
                <NumberFormat
                  thousandSeparator={true}
                  displayType={"text"}
                  suffix={"$"}
                  value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                />
              )}
          </div>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
