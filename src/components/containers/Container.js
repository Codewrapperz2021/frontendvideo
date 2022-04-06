import React, { Component } from "react";
import DateTime from "../data/DateTime";
import EventForm from "../MeetingScheduler/EventForm"
import EventList from "../MeetingScheduler/EventList";
import Controls from "../MeetingScheduler/Controls";
import Vnavbar from "../Masterlayout/Vnavbar";
import Vsidebar from "../Masterlayout/Vsidebar";
import Vfooter from "../Masterlayout/Vfooter";
import axios from 'axios';


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dt: "",
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {},
      events: [],
    };
    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }
  handleShowFormClick() {
    this.setState({
      formVisible: !this.state.formVisible
    });
  }
  handleFormCancel() {
    this.setState({
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {}
    });
  }
  handleFormSubmit(event) {
    // let events = this.state.events;
    // const eventIndex = events.findIndex(obj => {
    //   return obj.uid === event.uid;
    // });
    // if (eventIndex === -1) {
    //   events.push(event);
    // } else {
    //   events[eventIndex] = event;
    // }
    this.setState({
      event: event,
      formVisible: false
    });
  }
  
  // handleDelete =() => {
  //   var id=props.id
  //    axios.delete(`http://localhost:3001/api/meets/addMeet/`,id)
  //   .then(res => {
  //     console.log('success')
  //   })
  //   }
//   handleDelete =() => {
//     var id= this.props.id
//     axios.delete(`http://localhost:3001/api/meets/addMeet/`+id)
//       .then(res => {
//        this.console.log('success');
//         });

// }  
  handleEditItem(sc) {
    this.setState({
      selectedEvent: sc,
      hasSelectedEvent: true,
      formVisible: true
    });
  }
  componentDidMount() {
    const dt = new DateTime();
    const currentDateTime = dt.getCurrentDateTime();
    this.setState({
      dt: currentDateTime
    });
  }
  
  render() {
    return (
      <div id="root">
        <div>
          <Vnavbar />
          <Vsidebar />
          <div class="content-body" style={{ minHeight:"850px" }}>
            {/* <!-- row --> */}
            <div class="container-fluid">
              <div className='row' >
                <div id={this.props.id} >
                  <Controls
                    onShowFormClick={this.handleShowFormClick}
                    formVisible={this.state.formVisible}
                  />
                  {this.state.formVisible ? (
                    <EventForm
                      formVisible={this.state.formVisible}
                      formTitle="Schedule a meeting"
                      onFormCancel={this.handleFormCancel}
                      onFormSubmit={this.handleFormSubmit}
                      selectedEvent={this.state.selectedEvent}
                      hasSelectedEvent={this.state.hasSelectedEvent}
                    />
                  ) : null}
                  <EventList
                    events={this.state.events}
                    // handleDelete={this.handleDelete}
                    onEditItem={this.handleEditItem}
                  />
                </div>
              </div>
            </div>
          </div>
          <Vfooter />
        </div>
      </div>
    );
  }
}

export default Container;
