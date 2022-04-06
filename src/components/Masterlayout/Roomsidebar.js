import React, { useCallback } from 'react';
import styled from 'styled-components';

const Roomsidebar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  return (
    <div>
      <div class="deznav">
        <div class="deznav-scroll">
          <div style={{ textAlign: 'center' }}>
          <div class=" mt-4 mb-4">
            <CameraButton onClick={toggleCameraAudio} data-switch='video'>
              <div style={{ color: 'white', fontSize: '2%' }} class="sb-nav-link-icon">
                {userVideoAudio.video ? (
                  <FaIcon className='fas fa-video'></FaIcon>
                ) : (
                  <FaIcon style={{ color: '#A4A4A4'}} className='fas fa-video-slash'></FaIcon>
                )}
              </div>
              <p style={{ color: 'white', fontSize: '10px' }}>Camera</p>
            </CameraButton>
           </div>
            {showVideoDevices && (
              <SwitchList>
                {videoDevices.length > 0 &&
                  videoDevices.map((device) => {
                    return <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} >{device.label}</div>;
                  })}
                <div style={{ color: 'white', fontSize: '10px' }}>Switch Camera</div>
              </SwitchList>
            )}
            <div class=" mb-4">
            <CameraButton onClick={toggleCameraAudio} data-switch='audio'>
              <div style={{ color: 'white', fontSize: '2%' }} class="sb-nav-link-icon">
                {userVideoAudio.audio ? (
                  <FaIcon className='fas fa-microphone'></FaIcon>
                ) : (
                  <FaIcon style={{ color: '#A4A4A4'}} className='fas fa-microphone-slash'></FaIcon>
                )}
              </div>
             <p style={{ color: 'white', fontSize: '10px' }}>Audio</p>
            </CameraButton>
            </div>
            <div class=" mb-4">
            <ChatButton onClick={clickChat}>
              <div style={{ color: 'white', fontSize: '2%' }} class="sb-nav-link-icon">
                <FaIcon className='fas fa-comments'></FaIcon>
              </div>
              <p style={{ color: 'white', fontSize: '10px' }}>Chat</p>
            </ChatButton>
            </div>
            <div class=" mb-4">
            <ScreenButton onClick={clickScreenSharing}>
              <div  style={{ color: 'white', fontSize: '2%' }} class="sb-nav-link-icon">
                <FaIcon
                  className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`}
                ></FaIcon>
              </div>
              <p style={{ color: 'white', fontSize: '10px' }}>Share Screen</p>
            </ScreenButton>
            </div>
            <div class=" mb-4">
            <StopButton onClick={goToBack}>
              <div style={{ color: 'white', fontSize: '2%' }} class="sb-nav-link-icon">
                <FaIcon className="fas fa-stop"></FaIcon>
              </div>
              <p style={{ color: 'white', fontSize: '10px' }} >Leave</p>
            </StopButton>
            </div>
            </div>
          </div>
          <a class="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="feather feather-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </a>
       
      </div>
    </div >);
};

const ChatButton = styled.div`
//   width: 75px;
//   border: none;
//   font-size: 0.9375rem;
//   padding: 5px;

  // :hover {
  //   background-color: #77b7dd;
  //   cursor: pointer;
  //   border-radius: 15px;
  // }

  // * {
  //   pointer-events: none;
  // }
`;

const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  // :hover {
  //   // background-color: #77b7dd;
  //   cursor: pointer;
  //   // border-radius: 15px;
  // }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
//   width: 75px;
//   height: 30px;
//   border: none;
//   font-size: 0.9375rem;
//   line-height: 30px;
//   margin-right: 15px;
//   background-color: #ee2560;
//   border-radius: 15px;

  // :hover {
  //   background-color: #77b7dd;
  //   cursor: pointer;
  //   border-radius: 15px;
  // }
`;
const ViewButton = styled.div`
//   width: 75px;
//   height: 30px;
//   border: none;
//   font-size: 0.9375rem;
//   line-height: 30px;
//   margin-right: 15px;
//   background-color: #ee2560;
//   border-radius: 15px;

  // :hover {
  //   background-color: #77b7dd;
  //   cursor: pointer;
  //   border-radius: 15px;
  // }
`;

const CameraButton = styled.div`
//   position: relative;
//   width: 75px;
//   border: none;
//   font-size: 0.9375rem;
//   padding: 5px;.
//   margin-top: 5%;

  // :hover {
  //   background-color: #77b7dd;
  //   cursor: pointer;
  //   border-radius: 15px;
  // }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 80px;
  z-index: 1;

  // :hover {
  //   background-color: #476d84;
  //   cursor: pointer;
  //   border-radius: 15px;
  // }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  // left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;
export default Roomsidebar;
