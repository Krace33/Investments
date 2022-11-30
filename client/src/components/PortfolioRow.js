import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utilities/userContext";
import { Button } from 'react-bootstrap';
// import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';


export default function InvestmentRow(props) {
    
    const [data, setData] = useContext(UserContext);
    const [name, setName] = useState(props.name);
    const [isEditable, setisEditable] = useState(false);

    const fetch = async () => {
        const res = await axios.get('http://127.0.0.1:5000/portfolio', { withCredentials: true });
        if (res.status === 200) {
          setData({
            user: res.data.user,
            portfolios: res.data.portfolios,
            investments: null
          });
        }
      }

    const toggleIsEditable = () => setisEditable(!isEditable);


    const handleEdit = async (e) => {
        e.preventDefault();
        console.log("patch request called with", props.id, name);
        await axios.patch('http://127.0.0.1:5000/portfolio',
            {
                id:props.id,
                name
            }
            ,
            { withCredentials: true }
        )
        toggleIsEditable();
        await fetch();
    }

    const handleDelete = async () => {
        const res = await axios.post('http://127.0.0.1:5000/portfolio/delete', {
            name
        },
            { withCredentials: true });
        console.log(res);
        await fetch();
    }

    const editableText = (name, id) => {
        return <>
            <td>
                <form onSubmit={handleEdit}>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <button type="submit">Confirm</button>
                </form>
            </td>
        </>
    }

    const normalText = (name) => {
        return <>
            {/* <td><Button variant="outline-info" size="lg"><Link to={name}>{name}</Link></Button></td>
            
            <td><Button variant="info" size="lg">{props.worth}</Button></td> */}
             {/* <td><Button onClick={toggleIsEditable} variant="success">Edit</Button></td>  */}
        </>
    }

    const myStyle={
        width:"18rem",
        display:"flex"
    }

    return (
      <>
        <tr>
          <Card style={myStyle}>
            <Card.Img variant="top" src="../images/cardPhoto.jpg" />
            <Card.Body>
              <Card.Title>
                {normalText?<Link to={name}>{props.name}</Link>:null}
              </Card.Title>
              <Card.Text>
              {!isEditable ? normalText(name) : editableText(name, props.id)}
              This stock is worth {props.worth}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
              
              
              {!isEditable?<Button onClick={toggleIsEditable} variant="success">Edit</Button>:null}
              
            <Button onClick={handleDelete} variant="secondary">
              Delete
            </Button>
            </Card.Body>
          </Card>
          
          
        </tr>
      </>
    );
}