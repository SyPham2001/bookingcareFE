import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "./../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmiiter();
  }
  listenToEmiiter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", (data) => {
      //reste state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}
  toggle = () => {};
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      console.log("check inside loop", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameters:" + arrInput[i]);
        break;
      }
    }

    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      //call api create modal
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.props.toggleFromParent();
        }}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.props.toggleFromParent();
          }}
        >
          Create New User
        </ModalHeader>
        <ModalBody>
          <div className="input-container">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    aria-describedby="helpId"
                    placeholder
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name
                    id
                    aria-describedby="helpId"
                    placeholder
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "password");
                    }}
                    value={this.state.password}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>FirstName</label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    aria-describedby="helpId"
                    placeholder
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor>LastName</label>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    aria-describedby="helpId"
                    placeholder
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name
                  id
                  aria-describedby="helpId"
                  placeholder
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3  w3-button w3-red"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.props.toggleFromParent();
            }}
            className="px-3  w3-button w3-teal"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
