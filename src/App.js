import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';

import React from 'react';


function App() {
  return (
    <React.Fragment>
      <Router>

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>


      </Router>
    </React.Fragment>
  )

}

export default App;
