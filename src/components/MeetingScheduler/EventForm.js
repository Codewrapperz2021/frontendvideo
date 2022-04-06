import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import { Select, message, Spin } from "antd";
import Button from "@material-ui/core/Button";
import { dateFormat } from "../utils/DateUtils";
import { format } from "date-fns";
import axios from "axios";
import { api_base_url } from "../../backendbaseurl";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";

const containerStyle = {
  zIndex: 10,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#E8E8E8",
  padding: "2em 1em 1em",
  color: "#111111",
  borderRadius: "1em",
  border: "1px #000000 solid",
  width: "349px",
};

const formTitleStyle = {
  textAlign: "center",
  fontWeight: "400px",
  color: "#ffffff",
  backgroundColor: "#22b1ed",
  padding: "5px",
  marginTop: "-28px",
  marginRight: "-13.5px",
  marginLeft: "-13.5px",
  borderTopRightRadius: "12px",
  borderTopLeftRadius: "12px",
};

export default (props) => {
  const data = useSelector((state) => state.login.UserData);
  const [selectedDTStart, handleDTStartChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.dtstart : null
  );
  const [selectedDTEnd, handleDTEndChange] = useState(
    props.hasSelectedEvent ? props.selectedEvent.dtend : null
  );
  const [isDisabled, setDisabled] = useState(true);
  const [Email, setEmail] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [stime, setStime] = useState();
  const [etime, setEtime] = useState();
  const [uemail, setUemail] = useState([]);
  const [duration, setDuration] = useState("");
  const [dendmeeting, setDendmeeting] = useState("");
  const [spining, setSpining] = useState(false);
  const history = useHistory();
  const frmTitle = useRef(null);
  const { Option } = Select;
  const dend = new Date(selectedDTStart);
  const time = dend.getMinutes() + duration;
  const room_id = Math.floor(Math.random() * 100 + 900);
  const handleEsc = (evt) => {
    if (evt.keyCode === 27) {
      window.removeEventListener("keydown", handleEsc);
      props.onFormCancel();
    }
  };
  console.log("gus", Email);
  useEffect(() => {
    let endDate = dend;
    endDate.setMinutes(dend.getMinutes() + duration);
    const fmtDTStart = format(new Date(endDate), dateFormat);
    setDendmeeting(fmtDTStart);
    setEtime(endDate);
  }, [duration]);

  useEffect(() => {
    axios.get(api_base_url + "/users/allUsers").then((res) => {
      const email = res.data;
      setEmail(email);
    });
  }, []);
  window.addEventListener("keydown", handleEsc);
  const handleSubmit = () => {
    const event = {
      start_date: new Date(stime),
      end_date: new Date(etime),
      meet_name: title,
      organizer_email: data.user_email,
      desc: desc,
      meet_link: "http://localhost:3000/linktojoin" + room_id,
      room_id: room_id,
    };
    axios
      .post(api_base_url + "/meets/addMeet", event)
      .then((res) => {
        const d = {
          meeting_id: res.data.id,
          user_id: uemail
        }
        axios.post(api_base_url + "/usermeet/addusermeet", d).then(res => {
          fetch(api_base_url + "/testmail", {
            method: 'POST',
            body: new URLSearchParams({
              to: uemail.join(","),
              subject: "meeting scheduled",
              url:
                "Hii ,\n \n your meeting has been scheduled \n From :  " +
                event.start_date +
                "\n To:  " +
                event.end_date +
                "\n please join with this link \n " +
                event.meet_link +
                "\n and room id " +
                event.room_id,
            }),
          })
            .then((res) => {
              msg();
            })
            .catch((err) => {
              setSpining(false);
            });
        });
      })
      .catch((err) => {
        setSpining(false);
      });
  };
  async function msg() {
    message.success("meeitng scheduled", 10);
    setSpining(false);
    await (history.push(`/container`), window.location.reload(false));
  }

  const handleTextChange = () => {
    setDisabled(
      document.getElementById("dtstart").value === "" ||
        // document.getElementById("dtend").value === "" ||
        document.getElementById("event_title").value === "" ||
        // document.getElementById("event_email").value === "" ||
        document.getElementById("event_description").value === ""
    );
  };
  const inputStyle = {
    minWidth: "14em",
  };

  // console.log(fmtDTStart)
  return (
    <div style={containerStyle} id="appointmentform">
      <Spin spinning={spining} size="large">
        <h3 style={formTitleStyle}>{props.formTitle}</h3>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            id="dtstart_formatted"
            label="Start"
            value={selectedDTStart}
            minDate={new Date()}
            onChange={(dt) => {
              handleDTStartChange(dt);
              handleTextChange();
              setStime(dt);
            }}
            format={dateFormat}
            style={inputStyle}
          />
          <div style={inputStyle}>
            <Select
              id="event_email"
              className="mt-3 addform"
              placeholder="Duration"
              onChange={(e) => setDuration(e)}
              style={{ width: "100%", color: "rgba(0, 0, 0, 0.54)" }}
            >
              <Option style={{ color: "black" }} value={15}>
                15 min
              </Option>
              <Option style={{ color: "black" }} value={30}>
                30 min
              </Option>
              <Option style={{ color: "black" }} value={45}>
                45 min
              </Option>
              <Option style={{ color: "black" }} value={60}>
                1 hour
              </Option>
              <Option style={{ color: "black" }} value={90}>
                1.5 hour
              </Option>
              <Option style={{ color: "black" }} value={120}>
                2 hour
              </Option>
            </Select>
          </div>
        </MuiPickersUtilsProvider>
        <input
          defaultValue={selectedDTStart === null ? "" : selectedDTStart}
          id="dtstart"
          type="hidden"
        />
        <TextField
          id="dtend_formatted"
          label="End"
          value={dendmeeting == "January 1st, 1970 5:30 AM" ? "" : dendmeeting}
          style={inputStyle}
        />
        <TextField
          id="event_title"
          label="Title"
          onChange={(e) => [setTitle(e.target.value), handleTextChange()]}
          style={inputStyle}
          inputRef={frmTitle}
          defaultValue={
            props.hasSelectedEvent ? props.selectedEvent.title : null
          }
        />
        <div style={inputStyle}>
          <Select
            mode="tags"
            id="event_email"
            className="mt-3 addform"
            placeholder="Email"
            onChange={(e) => setUemail(e)}
            style={{ width: "100%", color: "rgba(0, 0, 0, 0.54)" }}
          >
            {Email.map((Email) => (
              <Option style={{ color: "black" }} value={Email.user_email}>
                {Email.user_email}
              </Option>
            ))}
          </Select>
        </div>
        <TextField
          id="event_description"
          label="Description"
          onChange={(e) => [setDesc(e.target.value), handleTextChange()]}
          style={inputStyle}
          defaultValue={
            props.hasSelectedEvent ? props.selectedEvent.description : null
          }
        />
        <div
          style={{ marginTop: "2em", minWidth: "12em", textAlign: "center" }}
        >
          <Button
            onClick={props.onFormCancel}
            style={{
              backgroundColor: "#f25767",
              borderColor: "#f25767",
              color: "#ffffff",
            }}
          >
            Cancel
          </Button>
          &nbsp;&nbsp;
          <Button
            color="primary"
            onClick={() => {
              handleSubmit();
              setSpining(true);
            }}
            id="formSubmit"
            disabled={isDisabled}
            style={{ backgroundColor: "#3a7afe", color: "#ffffff" }}
          >
            Submit
          </Button>
        </div>
      </Spin>
    </div>
  );
};
