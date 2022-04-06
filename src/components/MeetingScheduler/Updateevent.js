import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { message, Spin } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';
import { Select } from 'antd';
import { api_base_url } from '../../backendbaseurl';

export default function Updateevent() {
  const history = useHistory()
  const [onEditItem, setonEditItem] = useState([]);
  const [dValue, setDValue] = useState([])
  const [Email, setEmail] = useState([]);
  const [startdate, setStartdate] = useState();
  const [end, setEnddate] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [uemail, setUemail] = useState(['']);
  const [meeetingemail, setMeeetingemail] = useState([]);
  const [meetemail, setMeetemail] = useState([]);
  const [spining, setSpining] = useState(false);
  const { Option } = Select;
  const { id } = useParams();
  useEffect(() => {
    axios.get(api_base_url + "/users/allUsers")
      .then(res => {
        const email = res.data;
        setEmail(email)
      })
    axios.get(api_base_url + "/meets/" + id)
      .then(res => {
        const d = res.data;
        setonEditItem(d)
      })
    axios.get(api_base_url + "/usermeet/usermeetlist")
      .then(res => {
        const meeting = res.data;
        setMeeetingemail(meeting)
      })
  }, [])
  useEffect(() => {
    test()
  }, [onEditItem, meeetingemail])

  useEffect(() => {
    setDValue(meetemail.map((el) => { return el.user_id }))
  }, [meetemail])

  const test = async () => {
    const temp1 = meeetingemail.filter(el => { return el.meeting_id == onEditItem.id })
    setMeetemail(temp1)
  }
  const handleSubmit = () => {
    const event = {
      start_date: startdate,
      end_date: end,
      meet_name: title,
      email: uemail,
      desc: desc,
      room_id: Math.floor((Math.random() * 100) + 900)
    };
    axios.put(api_base_url + "/meets/" + id, event)
      .then(res => {
        fetch(api_base_url + "/email", {
          method: 'POST',
          body: new URLSearchParams({
            email: dValue.join(','),
            link: 'Hii ,\n \n your meeting has been Rescheduled \n From :  ' + event.start_date + '\n To:  ' + event.end_date + '\n please join with this link \n ' + onEditItem.meet_link + '\n and room id ' + onEditItem.room_id,
          })
        }).then(res => {
          history.push(`/container`);
          message.success('meeting updated successfully');
        })

      })
  };
  return (
    <form>
      <Spin spinning={spining} size="large" >
        <div className="container pt-5 d-flex justify-content-center" style={{ marginTop: '10%' }} >
          <div className="col-md-6 shadow p-4">
            <Con><TopHeader>Update meeting</TopHeader></Con>
            <label for="exampleDataList" class="form-label">Start</label>
            {/* <input type="datetime-local"  id="birthdaytime" name="birthdaytime" /> */}
            <input class="form-control" type="datetime-local" id="exampleDataList" defaultValue={onEditItem.start_date} onChange={(e) => setStartdate(e.target.value)} />
            <label for="exampleDataList" class="form-label">End</label>
            <input class="form-control" type="datetime-local" id="exampleDataList" defaultValue={onEditItem.end_date} onChange={(e) => setEnddate(e.target.value)} />
            <label for="exampleDataList" class="form-label">title</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList" defaultValue={onEditItem.meet_name} onChange={(e) => setTitle(e.target.value)} />
            {/* <label for="exampleDataList" class="form-label mt-1">Email</label>
          <div> */}
            {/* <select className='form-control' name="subjectname" defaultValue={onEditItem.email} onChange={(e) => setUemail(e.target.value)}>
              <option type='hidden' value={onEditItem.email}>{onEditItem.email}</option>
                {Email.map(email =>
                  <option value={email.user_email} >{email.user_email}</option>
                )}
              </select> */}
            {/* {meetemail && dValue.length>0 &&<Select mode="tags"  class='updateform' id="event_email" defaultValue={dValue} onChange={(e) => setUemail(e)} style={{ width: '100%', color: 'rgba(0, 0, 0, 0.54)' }} >
              {Email.map(Email =>
                <Option style={{ color: 'black' }} value={Email.user_email} >{Email.user_email}</Option>
              )}
            </Select>} */}
            {/* </div> */}
            <label for="exampleDataList" class="form-label">Description</label>
            <input class="form-control" list="datalistOptions" id="exampleDataList" defaultValue={onEditItem.desc} onChange={(e) => setDesc(e.target.value)} />
            <div style={{ marginLeft: '30%', marginTop: '3%' }} >
              <Link to='/container' class="btn btn-danger" >Cancel</Link>   &nbsp;<button class="btn btn-primary" type="button" onClick={() => { handleSubmit(); setSpining(true) }}>Update</button>
            </div>
          </div>
        </div>
      </Spin>
    </form>
  )
}
const TopHeader = styled.div`
text-align: center;
  width: 100%;
  padding:5px;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background:#22b1ed;
  margin-top:-24px;
  borderTopRightRadius:'5px';
  borderTopLeftRadius:'5px';
  margin-bottom: 5%;
`;
const Con = styled.div` 
margin-left:-24px;
margin-right:-24px;
`;