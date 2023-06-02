import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import "./ManageClinic.scss";
import { createNewSpecialty } from "../../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { createNewClinic } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,
      address: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {
    let { language } = this.props;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  openPreivewImage = () => {
    this.setState({
      isOpen: true,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    // console.log(" check data ", data);
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log(" check image file base 64", base64);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create a new clinic success!");
      this.setState({
        previewImgURL: "",
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create a new clinic error!");
      console.log(" check error create a new clinic", res);
    }
  };

  render() {
    let { language } = this.props;

    return (
      <div className="manage-specialty-container">
        <div className="title">Quản lý Phòng Khám</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <div className="preview-img-container">
              <div className="row">
                <label className="col-12">Ảnh phòng khám:</label>
                <div className="col12">
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    Tải ảnh
                    <i
                      className="fa-solid fa-cloud-arrow-up"
                      style={{ margin: 5 }}
                    />
                  </label>
                  <div
                    className="previewImg"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreivewImage()}
                  ></div>
                  {this.state.isOpen === true && (
                    <Lightbox
                      mainSrc={this.state.previewImgURL}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12"></div>
          <div className="col-12">
            <button
              className="w3-button w3-green"
              onClick={() => this.handleSaveNewClinic()}
            >
              Lưu
            </button>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
