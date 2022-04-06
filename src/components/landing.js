import React, { useEffect } from 'react';
import Vnavbar from './Masterlayout/Vnavbar';
import Vsidebar from './Masterlayout/Vsidebar';
import Vfooter from './Masterlayout/Vfooter';
import image from '../image/videoimg.png';
import { useHistory,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Landing() {
  const data = useSelector(state => state.login.UserData)
  const history = useHistory()
  // window.location.reload();
  // function join(e) {
  //   history.push(`/main`);
  // }
  function CreateMeeting() {
    {data.accessToken!=null ?history.push(`/container`):history.push(`/Login`)}
  // window.location.reload(false);
  }
  return (
    <div id="root">
      <div>
        {/* id="main-wrapper" */}
        <Vnavbar />
        <Vsidebar />
        <div class="content-body" style={{ minHeight:"850px" }}>
          {/* <!-- row --> */}
          <div class="container-fluid">
            <div className='row' style={{ marginLeft: '2%' }}>
              <div style={{ marginTop: '5%' }} className='col-sm-6 '>
                <h1 style={{ marginBottom: '1.5rem' }}>Realcoderz Meet</h1>
                <p style={{ fontSize: '17px' }}>It's an online plateform that allows users from diffrent locations to hold face to face  <br></br>meetting without having to move to a single location together and even share files.</p>
                <p style={{ marginTop: '2%', fontSize: '15px' }}>let's meet through us.</p>
                <div style={{ marginRight: '5px', marginTop: '4%' }}>
                <Link to="/main"> <button type="button"class="btn btn-primary">Join meetting</button></Link> &nbsp;&nbsp;
                  <button type="submit" onClick={CreateMeeting} class="btn btn-primary">Create meetting</button>
                </div>
              </div>
              <div className='col-sm-6 mt-3'>
                <img src={image} style={{ width: '100%', height: '100%' }}></img>
              </div>
            </div>
          </div>
        </div>
        <Vfooter />
      </div>
    </div>
  )
}
