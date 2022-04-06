import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import { dateFormat } from "../utils/DateUtils";
import Deleteevent from "./Deleteevent";
import axios from "axios";
import { api_base_url } from "../../backendbaseurl";
import { useSelector } from "react-redux";

const containerStyle = {
  overflowY: "scroll",
  width: "100%",
};

export default (props) => {
  const reduxdata = useSelector((state) => state.login.UserData);
  const [meetingdata, setMeetingdata] = useState([]);
  const [vali, setVali] = useState("");
  const [meeetingemail, setMeeetingemail] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    test();
  }, [meetingdata, meeetingemail]);
  console.log("vali", vali);
  const test = async () => {
    const temp = await meetingdata.map((me) => {
      const temp1 = meeetingemail.filter((el) => {
        return el.meeting_id == me.id;
      });
      return { ...me, email: temp1 };
    });

    // setData(temp)
    setData(
      temp.filter((tm) => {
        if (tm.organizer_email == reduxdata.user_email) {
          return true;
        } else {
          const check = tm.email.filter(
            (em) =>
              reduxdata.user_email == em.user_id ||
              reduxdata.user_email == em.organizer_email
          );
          if (check.length > 0) {
            return true;
          } else return false;
        }
      })
    );
  };
  useEffect(() => {
    axios.get(api_base_url + "/meets/allMeets").then((res) => {
      const meeting = res.data;
      setMeetingdata(meeting);
    });
    axios.get(api_base_url + "/usermeet/usermeetlist").then((res) => {
      const meeting = res.data;
      setMeeetingemail(meeting);
    });
  }, []);
  const events = data
    .sort((a, b) => {
      return new Date(a.start_date) > new Date(b.end_date) ? 1 : -1;
    })
    .map((sc) => {
      const fmtDTStart = format(new Date(sc.start_date), dateFormat);
      const fmtDTEnd = format(new Date(sc.end_date), dateFormat);
      return (
        <div style={{ marginTop: "10px" }}>
          <ListItem button alignItems="flex-start">
            <ListItemIcon>
              <EventIcon style={{ color: "#3a7afe", fontSize: "2em" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography component="p" style={{ color: "#3a7afe" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      From:
                    </span>
                    {fmtDTStart}
                  </Typography>
                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      To:
                    </span>
                    {fmtDTEnd}
                  </Typography>
                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Title:
                    </span>
                    {sc.meet_name}
                  </Typography>
                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Organizer:
                    </span>
                    {reduxdata.user_email == sc.organizer_email
                      ? "you"
                      : sc.organizer_email}
                  </Typography>
                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Attendee:
                    </span>
                    <select
                      style={{ color: "black", marginLeft: "-3px" }}
                      name="subjectname"
                    >
                      {sc.email.map((email) => (
                        <option style={{ color: "black", marginLeft: "-3px" }}>
                          {email.user_id}
                        </option>
                      ))}
                    </select>
                    {/* {reduxdata.user_email ==email.user_id?setVali(email.user_id):''} */}
                  </Typography>
                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Meet Link:
                    </span>
                    <a href={sc.meet_link}>Click to join</a>
                  </Typography>

                  <Typography component="p" style={{ color: "#000000" }}>
                    <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                      Room Id:
                    </span>
                    {sc.room_id}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    style={{ color: "#000000", fontSize: "1em" }}
                  >
                    {sc.desc}
                  </Typography>
                </React.Fragment>
              }
            />
            {reduxdata.user_email == sc.organizer_email ? (
              <div
                style={{
                  position: "absolute",
                  right: "2em",
                  top: "1em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Deleteevent id={sc.id} />

                <Button
                  variant="contained"
                  color="primary"
                  title="Edit Appointment"
                  disabled={props.formVisible}
                  className="editbutton"
                  style={{ backgroundColor: "#3a7afe" }}
                >
                  <Link to={"/updateevent/" + sc.id}>
                    <i style={{ color: "white" }} class="far fa-edit"></i>
                    &nbsp;&nbsp;
                    <span style={{ color: "white" }} className="buttontext">
                      Edit
                    </span>
                  </Link>
                </Button>
              </div>
            ) : (
              ""
            )}
          </ListItem>
        </div>
      );
    });

  return (
    <div style={containerStyle}>
      <List>{events}</List>
    </div>
  );
};
