import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableUserManage from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;

      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        avatar: base64,
      });
    }
  };
  openPreivewImage = () => {
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
      //fire redux edit user
    }
    // fire redux action

    // this.props.fetchAllUserRedux();
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      }
      // },
      // () => {
      // }
    );
  };
  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
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
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux with LPH</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 title " style={{ marginBottom: 10 }}>
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-12 my-3">
                {isGetGenders === true ? "Loading Gender" : ""}
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name
                    id
                    placeholder
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder
                    // type="password"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
              </div>
              <div className="col-9">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor>
                    {" "}
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      type="file"
                      id="previewImg"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <div className="row">
                      <label
                        htmlFor="previewImg"
                        className="label-upload col-6"
                      >
                        Tải ảnh
                        <i
                          className="fa-solid fa-cloud-arrow-up"
                          style={{ margin: 5 }}
                        />
                      </label>
                      <div
                        className="previewImg col-6"
                        style={{
                          backgroundImage: `url(${this.state.previewImgURL})`,
                        }}
                        onClick={() => this.openPreivewImage()}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  className="w3-button w3-green mt-3"
                  // className={
                  //   this.state.action === CRUD_ACTIONS.EDIT
                  //     ? "w3-button w3-yellow mt-3"
                  //     : "w3-button w3-green mt-3"
                  // }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
            </div>
            <div className="col-12">
              <TableUserManage
                handleEditUserFromParent={this.handleEditUserFromParent}
                action={this.state.action}
              />
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
