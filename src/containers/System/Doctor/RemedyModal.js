import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;

    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { language, genders } = this.props;
    console.log("check state", this.state);
    let { isOpenRemedyModal, closeRemedyModal, dataModal, sendRemedy } =
      this.props;

    return (
      <>
        <Modal
          isOpen={isOpenRemedyModal}
          className="bookng-modal-container"
          size="lg"
          centered
          backdrop={true}
        >
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
            <span
              aria-hidden="true"
              className="close-span"
              style={{ cursor: "pointer" }}
              onClick={closeRemedyModal}
            >
              X
            </span>
          </div>

          <ModalBody>
            <div className="row">
              <div className="col-6 ">
                <div className="">
                  <label>Email bệnh nhân:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChangeEmail(event)}
                  />
                </div>
              </div>
              <div className="col-6 form-group">
                <div className="">
                  <label>Chọn file đơn thuốc:</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="w3-button w3-blue"
              onClick={() => this.handleSendRemedy()}
            >
              Send
            </button>
            <button className="w3-button w3-grey" onClick={closeRemedyModal}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
