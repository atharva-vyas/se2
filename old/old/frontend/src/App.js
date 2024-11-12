import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Main from './Main'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/dashboard' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
