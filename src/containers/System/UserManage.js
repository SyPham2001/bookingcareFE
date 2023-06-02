import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  creteNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "../System/ModalUser";
import ModalEditUser from "./ModalEditUser";

import { emitter } from "./../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEdtiUser: false,
      userEdit: {},
    };
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEdtiUser: !this.state.isOpenModalEdtiUser,
    });
  };
  /*
  Life cycle
  Run component
  1.Run constructor -> init state
  2.Didmount(set state)
  3.Render
  */

  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await creteNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }

    console.log("delete user", user);
  };
  handleEditUser = (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenModalEdtiUser: !this.state.isOpenModalEdtiUser,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      console.log("check save user", res);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEdtiUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage Users With LPH</div>
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEdtiUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEdtiUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}

        <div>
          <button
            className="w3-btn w3-blue mx-3 my-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-user-plus" style={{ marginRight: 2 }}></i>Add
            new user
          </button>
        </div>
        <div className="users-table mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th style={{ width: 250 }}>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="w3-btn w3-blue"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-edit"></i>Edit
                        </button>
                        <button
                          className="w3-btn w3-red"
                          style={{ marginLeft: 5 }}
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
