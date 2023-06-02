import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
    this.state = {
      username: "",
      password: "",
      isShowHiddenPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHiddenPassword = () => {
    this.setState({
      isShowHiddenPassword: !this.state.isShowHiddenPassword,
    });
  };
  handleKeyDown = (event) => {
    console.log("sy check ketdown:", event);
    if (event.key === "Enter " || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div
        className="bg-login"
        style={{
          backgroundImage: `url("https://wallpaperaccess.com/full/4822115.jpg")`,
        }}
      >
        <section className="wrapper">
          <div className="content">
            <div>
              <h2 className="text-center">Login</h2>
            </div>
            <section>
              <div className="social-login">
                <button>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google"
                    width={20}
                  />
                  <span>Google</span>
                </button>
                <button>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/150px-Facebook_f_logo_%282019%29.svg.png"
                    alt="facebook"
                    width={20}
                  />
                  <span>Facebook</span>
                </button>
              </div>
              <div
                className="des-login text-center"
                style={{ marginBottom: 5, marginTop: -10 }}
              >
                Or use email and password:
              </div>
              <div action className="login-form">
                <div className="input-group">
                  <label htmlFor="username">Username or Email</label>
                  <input
                    type="text"
                    placeholder="Username or Email"
                    id="username"
                    className="inputcontrol"
                    style={{ borderRadius: 50 }}
                    value={this.state.username}
                    onChange={(event) => this.handleOnChangeUsername(event)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <div className="custom-input-password">
                    <input
                      type={
                        this.state.isShowHiddenPassword ? "text" : "password"
                      }
                      placeholder="Password"
                      id="password"
                      className="inputcontrol"
                      style={{ borderRadius: 50 }}
                      value={this.state.password}
                      onChange={(event) => this.handleOnChangePassword(event)}
                      style={{
                        width: "100%",
                        position: "relative",
                        borderRadius: 50,
                      }}
                      onKeyDown={(event) => this.handleKeyDown(event)}
                    />
                    <span
                      className="eyes"
                      style={{
                        position: "absolute",
                        top: 34,
                        right: 16,
                        fontSize: 17,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        this.handleShowHiddenPassword();
                      }}
                    >
                      <i
                        className={
                          this.state.isShowHiddenPassword
                            ? "fas fa-eye"
                            : "fas fa-eye-slash"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
                <div
                  className="col-12"
                  style={{ color: "red", marginTop: 5, marginLeft: 150 }}
                >
                  {this.state.errMessage}
                </div>
                <div>
                  <button
                    className="w3-btn w3-blue"
                    onClick={() => {
                      this.handleLogin();
                    }}
                    style={{ marginTop: 10 }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </section>
            <footer>
              <a href="#" title="Forgot Password">
                Forgot Password
              </a>
            </footer>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    // userLoginSuccess: (userInfo) =>
    //   dispatch(actions.userLoginSuccess(userInfo)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
