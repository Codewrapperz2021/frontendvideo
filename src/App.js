import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import './App.css'
import Path from './Path';
import './css/style.css';
import './css/globalstyle.css';
import './css/perfect-scrollbar.css';
import './css/new.css';
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Path/>       
      </AppContainer>
    </BrowserRouter>
  );
}

const AppContainer = styled.div`
  
`;

export default App;
