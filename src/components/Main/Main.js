import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socket";
import Vfooter from "../Masterlayout/Vfooter";
import Vsidebar from "../Masterlayout/Vsidebar";
import Vnavbar from "../Masterlayout/Vnavbar";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [username, setuserName] = useState();
  const [roomname, setroomName] = useState();
  const data = useSelector((state) => state.login.UserData);

  const history = useHistory();

  function Cancel() {
    history.push(`/`);
    // window.location.reload(false);
  }
  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem("user", userName);

        // var winFeature =
        // 'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes';
        //  window.open('Result.html','null',winFeature);

        props.history.push(`/room${roomName}`);
      } else {
        setErr(error);
        setErrMsg("User name already exist");
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg("Enter Room Name or User Name");
    } else {
      socket.emit("BE-check-user", { roomId: roomName, userName });
    }
  }

  return (
    <div id="root">
      <div>
        <Vnavbar />
        <Vsidebar />

        <div class="content-body" style={{ minHeight: "850px" }}>
          {/* <!-- row --> */}
          <div class="container-fluid pt-6">
            <div class="row ">
              <div id="left-slide">
                <div class="row mb-3" style={{ marginTop: "7%" }}>
                  <div
                    className=" container text-center col-md-4 shadow p-4 "
                    style={{ backgroundColor: "#E8E8E8" }}
                  >
                    <Con>
                      <TopHeader>Join a meetting</TopHeader>
                    </Con>
                    <div className="d-flex justify-content-center p-4 mt-6">
                      <div className="d-flex flex-column">
                        <label
                          style={{
                            fontSize: "20px",
                            marginTop: "5px",
                            color: "black",
                          }}
                          className="mb-4"
                          for="formGroupExampleInput"
                        >
                          <b>User Name</b>
                        </label>
                        <label
                          style={{ fontSize: "20px", color: "black" }}
                          className="mb-4"
                          for="formGroupExampleInput"
                        >
                          <b>Room id</b>
                        </label>
                      </div>
                      <div className="d-flex flex-column ml-3">
                        <input
                          className="form-control mb-3 "
                          type="text"
                          placeholder="Smith"
                          defaultValue={data.user_name}
                          onChange={(e) => setuserName(e.target.value)}
                          ref={userRef}
                        />
                        <input
                          className="form-control mb-3"
                          type="text"
                          placeholder="874"
                          onChange={(e) => setroomName(e.target.value)}
                          ref={roomRef}
                        />
                      </div>
                    </div>
                    <button
                      onClick={Cancel}
                      type="submit"
                      class="btn btn-danger"
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={clickJoin}
                      type="submit"
                      class="btn btn-primary"
                    >
                      Join
                    </button>
                    {err ? (
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "20px",
                          color: "#e85a71",
                        }}
                      >
                        {errMsg}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Vfooter />
      </div>
    </div>
  );
};
export default Main;
const TopHeader = styled.div`
  text-align: center;
  width: 100%;
  padding: 5px;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background: #22b1ed;
  margin-top: -24px;
  bordertoprightradius: "5px";
  bordertopleftradius: "5px";
  margin-bottom: 5%;
`;
const Con = styled.div`
  margin-left: -24px;
  margin-right: -24px;
`;
