import React from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import logo2 from "../../images/logo-2.png";
import { useSelector } from "react-redux";
export default function Vnavbar() {
  const history = useHistory();
  const data = useSelector((state) => state.login.UserData);
  function Login() {
    history.push("/login");
  }
  function Logout() {
    message.success("Logged out successfully");
    localStorage.clear();
    history.push(`/`);

    window.location.reload(false);
  }
  console.log("redux", data.token);
  return (
    <div>
      {/* <!--**********************************
            Nav header start
        ***********************************--> */}
      <div class="nav-header">
        <a class="brand-logo">
          <img class="logo-abbr" src={logo2} alt="" />
        </a>
        <div class="nav-control">
          <div class="hamburger">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
      </div>

      {/* <!--**********************************
            Nav header end
        ***********************************-->


		<!--**********************************
            Header start
        ***********************************--> */}
      <div class="header">
        <div class="header-content">
          <nav class="navbar navbar-expand">
            <div class="collapse navbar-collapse justify-content-between">
              <div class="header-left">
                <div
                  style={{
                    height: "auto",
                    width: "auto",
                    position: "fixed",
                    fontSize: "25px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  RealCoderz Meet
                </div>
              </div>
              <ul class="navbar-nav header-right">
                <li class="nav-item dropdown notification_dropdown">
                  <a class="nav-link bell dz-fullscreen">
                    <svg
                      id="icon-full"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                    <svg
                      id="icon-minimize"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-minimize"
                    >
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                  </a>
                </li>
                <li class="nav-item dropdown notification_dropdown">
                  <a
                    class="nav-link bell ai-icon"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <svg
                      id="icon-user"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <div class="pulse-css"></div>
                  </a>
                </li>
                {data.accessToken == null ? (
                  <button
                    className="btn btn-primary ml-2 mt-3"
                    onClick={Login}
                    style={{ height: "45px" }}
                  >
                    Login
                  </button>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary ml-2 mt-3"
                      style={{ height: "45px" }}
                    >
                      {data.user_name}
                    </button>{" "}
                    <button
                      className="btn btn-primary ml-2 mt-3"
                      onClick={Logout}
                      style={{ height: "45px" }}
                    >
                      Logout
                    </button>
                  </div>
                )}
                <li class="nav-item right-sidebar">
                  <a class="nav-link bell ai-icon">
                    <svg
                      id="icon-menu"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="css-i6dzq1"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* <!--**********************************
            Header end ti-comment-alt
                ***********************************-->*/}
    </div>
  );
}
