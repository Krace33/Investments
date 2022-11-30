import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const url = 'http://127.0.0.1:5000/signup';
  const navigate = useNavigate()

  const [details, setDetails] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(url, details, {
      withCredentials: true
    })
    res.status===200?navigate('/portfolio'):navigate('/signup');
  }


  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
    <div>
    <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={details.username}
            onChange={(e)=>setDetails({...details, username: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={details.password}
            onChange={(e)=>setDetails({...details, password: e.target.value})}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
    </div></div>
  )
}

export default SignUp