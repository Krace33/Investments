import React,{ useState } from 'react'
import axios from "axios";


const Home = () => {
    const [res, setRes] = useState("Check Server");

    const check = async () => {
        setRes("Loading");
        const response = await axios.get('http://127.0.0.1:5000');
        const ans = response.data;
        setRes(ans);
    }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
    <div>
    <h1>This is the landing page</h1>
    <h3>{res}</h3>
    <button onClick={check}>Click me!!</button>
    </div>
    </div>
    </div>
    
  )
}

export default Home