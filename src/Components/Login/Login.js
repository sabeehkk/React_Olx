import React, { useState,useContext ,useEffect} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { firebaseContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {firebase} = useContext(firebaseContext)
  const navigate = useNavigate()
  const handleLogin =(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, redirect to the home page
        navigate('/');
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [firebase, navigate]);


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
