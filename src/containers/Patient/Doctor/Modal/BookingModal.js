import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
    };
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidMount() {
    let { language } = this.props;
    this.props.getGenders();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
   
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${this.capitalizeFirstLetter(date)}`;
    }
    return "";
  };
  handleComfirmBooking = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let doctorName = this.buildDoctorName(this.props.dataTime);
    // validate input
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    this.setState({
      isShowLoading: true,
    });
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      genders: this.state.genders,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthday: "",
        selectedGender: "",
        doctorId: "",
        genders: "",
        timeType: "",
        isShowLoading: false,
      });
      toast.success("Booking a new appointment success!");
      this.props.closeModal();
    } else {
      toast.error("Booking a new appointment error!");
      this.props.closeModal();
      this.setState({
        isShowLoading: false,
      });
    }
    
  };
  checkValidateInput = () => {
    let arrCheck = [
      "fullName",
      "phoneNumber",
      "email",
      "address",
      "reason",
      "birthday",
      "selectedGender",
      "doctorId",
      "genders",
      "timeType",
    ];
    let isValid = true;
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required:" + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  render() {
    let { language, genders } = this.props;

    let { isOpenModal, closeModal, dataTime } = this.props;
    // console.log("check dataTime", dataTime);
    let doctorId = "";
    // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <Modal
            isOpen={isOpenModal}
            className="bookng-modal-container"
            size="lg"
            centered
            backdrop={true}
          >
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="left">
                  <FormattedMessage id="patient.booking-modal.title" />
                </span>
                <span className="right" onClick={closeModal}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
              <div className="booking-modal-body">
                <div className="infor-doctor">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataTime}
                    isShowLinkDetail={false}
                    isShowPrice={true}
                  />
                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.fullName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.phoneNumber" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      onChange={this.handleOnChangeDatePicker}
                      className="form-control"
                      value={this.state.birthday}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      {" "}
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                <button
                  className="w3-button w3-orange btn-booking-confirm"
                  onClick={() => this.handleComfirmBooking()}
                >
                  <FormattedMessage id="patient.booking-modal.btnConfirm" />
                </button>
                <button
                  className="w3-button w3-grey btn-booking-cancel"
                  onClick={closeModal}
                >
                  <FormattedMessage id="patient.booking-modal.btnCancel" />
                </button>
              </div>
            </div>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
