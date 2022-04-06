import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import { message } from 'antd';
import axios from 'axios';
import { api_base_url } from "../../backendbaseurl";

export default function Deleteevent(props) {
  const [id] = useState('');
  const history = useHistory()
  const handleDelete = () => {
    var id = props.id
    axios.delete(api_base_url + "/meets/" + id)
      .then(res => {
        msg();
      })
  }
  async function msg() {
    message.success('meeitng deleted', 10)
    await (history.push(`/container`),
      window.location.reload(false));
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className="deletebutton"
        onClick={() => handleDelete()}
        style={{
          marginBottom: "1em", backgroundColor: "#f25767",
          borderColor: "#f25767"
        }}
      ><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;&nbsp;
        <span className="buttontext">Cancel</span>
      </Button>
    </>
  );
}
