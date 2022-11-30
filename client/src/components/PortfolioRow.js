import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utilities/userContext";

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
                investments: null,
                obj: res.data.obj,
            });
        }
    }

    const toggleIsEditable = () => setisEditable(!isEditable);


    const handleEdit = async (e) => {
        e.preventDefault();
        console.log("patch request called with", props.id, name);
        await axios.patch('http://127.0.0.1:5000/portfolio',
            {
                id: props.id,
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
            <td><Link to={name}>{name}</Link></td>
            <td>{props.worth}</td>
            <td><button onClick={toggleIsEditable}>Edit</button></td>
        </>
    }


    return <>
        <tr>
            {!isEditable ? normalText(name) : editableText(name, props.id)}
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    </>
}