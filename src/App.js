import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthContext } from './store/firebaseContext';
import Home from './Pages/Home';
import firebase from './firebase/config';
import Post from './store/postContext';

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  },[]);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/create" element={<Create />} />

            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
