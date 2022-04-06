import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from 'react-router-dom';


export default props => {
  const history = useHistory()
  function home() {
    //  e.preventDefault();
    history.push(`/`);
    // window.location.reload(false);
  }
  return (
    <div  id="titlebar">
      <h5>Meeting Scheduler</h5>
      <Button
       style={{backgroundColor:'#3a7afe',color:"#ffffff"}}
        startIcon={<AddIcon />}
        onClick={props.onShowFormClick}
        title={props.formVisible ? `Hide Form` : `Show Form`}
        disabled={props.formVisible}
        
      >
        Create meeting
      </Button>&nbsp;&nbsp;
      <Button
       style={{backgroundColor: "#29dd0f",color:"#ffffff"}}
        onClick={home}
        title={props.formVisible ? `Hide Form` : `Show Form`}
        disabled={props.formVisible}
        
        
      >
       <i class="fa fa-home" aria-hidden="true"></i> &nbsp;&nbsp; Home Page
      </Button>
    </div>
  );
};
