import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../utilities/userContext';
import InvestmentRow from '../components/InvestmentRow';

const Portfolio = () => {

  const navigate = useNavigate();
  const [data, setData] = useContext(UserContext);
  const [add, setAdd]= useState(true);
  const [details, setDetails]=useState({
    name:'',
    quantity:0
  });
  const {portfolioName}=useParams();

  const url = 'http://127.0.0.1:5000/logout';

  const handleLogout = async () => {
    await axios.get(url, {
      withCredentials: true
    });
    navigate('/');
  }

  const fetch = async () => {
    const res = await axios.get(`http://127.0.0.1:5000/portfolio/${portfolioName}`, { withCredentials: true });
    if (res.status === 200) {
      setData({
        user: res.data.userID,
        portfolios: portfolioName,
        investments: res.data.investments
      });
    }
  }

  const handleAdd=async(e)=>{
    e.preventDefault()
    await axios.post(`http://127.0.0.1:5000/portfolio/${portfolioName}`, {
      name: details.name,
      number: details.quantity
    }, {
      withCredentials: true
    });
    await fetch();
    toggleAdd();
  }

  const addInvestmentElement=()=>{
    return <form onSubmit={handleAdd}>
      <input type='text' value={details.name} onChange={(e)=>setDetails({...details, name: e.target.value})}></input>
      <input type='number' value={details.quantity} onChange={(e)=>setDetails({...details, quantity: e.target.value})}></input>
      <button type='submit'>Submit</button>
    </form>
  }

  const toggleAdd=()=>setAdd(!add);

  useEffect(() => {
    fetch()
  }, []);

  return (
    <div>
      <p>Portfolio</p>
      <table>
        <tbody>
          {data.investments && data.investments.map((investment) => {
            return (
              <InvestmentRow
                key={investment._id}
                name={investment.name}
                quantity={investment.quantity}
                id={investment._id}
                param={portfolioName}
              />
            )
          })}
        </tbody>
      </table>
      {add?
      <button onClick={toggleAdd}>Add</button>
      :addInvestmentElement()}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Portfolio