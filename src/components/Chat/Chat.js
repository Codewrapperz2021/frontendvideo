import React, { useEffect, useState, useRef } from 'react';
import {api_base_url} from "../../backendbaseurl";
import styled from 'styled-components';
import socket from '../../socket';
import emoji from '../../assets/emoji.png';
import axios from 'axios';
import file from '../../assets/paperclip-icon.png';
import send from '../../assets/send.png';
import Emoji from './Emoji';
const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem('user');
  const [msg, setMsg] = useState([]);
  const [message,setdbMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const [displayEmoji, setDisplayEmoji] = useState(false);
  const inputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState('');
  console.log(selectedFiles.name)

 const submitHandler =  (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message',message);
    formData.append("file",selectedFiles);
    axios.post(api_base_url+"/chats/addChat",formData, {

    
    }); 

  };


  // const clickEmoji = () => {
  //   if (!displayEmoji) {
  //     setDisplayEmoji(true);
  //   } else {
  //     setDisplayEmoji(false);
  //   }
  // }

  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => { scrollToBottom() }, [msg])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter' || e.key === 'Shift') {
      const msg = e.target.value;
      if (msg) {
        socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
      }
    }
  };
  const sendM = (e) => {
    const msg = e.target.value;
    if (msg) {
      socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
      inputRef.current.value = '';
    }
  };

  return (
    <ChatContainer className={display ? '' : 'width0'}>
      <TopHeader>Group Chat Room</TopHeader>
      {/* <button  onClick={sendM}>Send</button> */}
      {/* <button onClick={clickEmoji}>Emoji</button> */}
      <ChatArea>
        <MessageList>
          {msg &&
            msg.map(({ sender, msg }, idx) => {
              if (sender !== currentUser) {
                return (
                  <Message key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </Message>
                );
              } else {
                return (
                  <UserMessage key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </UserMessage>
                );
              }
            })}
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
        </MessageList>
        {/* {displayEmoji ? <Emoji /> : null}
        {/* <Emoji display={displayEmoji} /> */}
      </ChatArea>
      {/* <BottomInput
            ref={inputRef}
            onKeyUp={sendMessage}
            placeholder="Enter your message"
          /> */}
      <form onSubmit={submitHandler} encType='multipart/form-data' class="form-inline">
        <div class="input-group mb-2 " style={{ marginLeft: '5px' }}>
          <div class="input-group-prepend">
            <img className='input-group-text text-dark' style={{ width: '45px', height: '45px' }} src={emoji} alt={''}></img>
          </div>
          <input type="text" class="form-control" style={{  height: '45px' }} id="inlineFormInputGroupUsername2" placeholder={selectedFiles.name} onChange ={(e) => setdbMsg(e.target.value)} onKeyUp={sendMessage} ref={inputRef}></input>
          <div class="input-group-prepend">
            <label class="uploadFile">
              <img className='input-group-text text-dark' style={{ width: '45px', height: '45px' }} src={file} alt={''}></img>
              <input type="file" placeholder={selectedFiles.name} id ="file" onChange = {(e) => setSelectedFiles(e.target.files[0])} style={{display : 'none'}} class="inputfile form-control" name="file" />
            </label>
          </div>
          <div class="input-group-prepend" style={{borderRadius: '7px'}}>
          <button type= 'submit' style={{border:"none"}}><img src={send} className='input-group-text text-dark' style={{ width: '45px', height: '45px' }} /></button>
            {/* <img className='input-group-text text-dark' style={{ width: '45px', height: '45px' }} src={send} alt={''} value="send" onClick={sendM}></img> */}
          </div>
        </div>
      </form>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2%; 
  margin-top: 10%;
  margin-bottom: 0%;
  width: 25%;
  height: 500px;
  background-color: white;
  // transition: all 0.5s ease;
  overflow: hidden;
  position:fixed;
  right:0;
  border-radius:2%;
`;

const TopHeader = styled.div`
text-align: center;
  width: 100%;
  padding:10px;
  // margin-top: 3%;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background:#22b1ed;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const MessageList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 15px;
  color: #454552;
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 15px;
  text-align: left;

  > strong {
    margin-left: 0px;
  }

  > p {
    max-width: 65%;
    margin-left: -5px;
    width: auto;
    padding: 9px;
    margin-top: 3px;
    border: 1px solid rgb(78, 161, 211, 0.3);
    border-radius: 15px;
    box-shadow: 0px 0px 3px #4ea1d3;
    text-align :right;
    font-size: 14px;
  }
`;

const UserMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  font-size: 16px;
  margin-top: 15px;
  text-align: right;
  margin-right: 0%;

  > strong {
    margin-right: 0px;
  }

  > p {
    max-width: 65%;
    width: auto;
    padding: 9px;
    margin-top: 3px;
    margin-right: 0px;
    border: 1px solid rgb(78, 161, 211, 0.3);
    border-radius: 15px;
    background-color: #22b1ed;
    color: white;
    font-size: 14px;
    text-align: left;
  }
`;

// const BottomInput = styled.input`
//   bottom: 0;
//   width: 100%;
//   height: 8%;
//   padding: 15px;
//   border-top: 1px solid rgb(69, 69, 82, 0.25);
//   box-sizing: border-box;
//   opacity: 0.7;

//   :focus {
//     outline: none;
//   }
// `;


export default Chat;
