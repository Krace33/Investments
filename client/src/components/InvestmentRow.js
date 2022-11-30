import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utilities/userContext";

export default function InvestmentRow(props) {

    const [data, setData] = useContext(UserContext);
    const [num, setNum] = useState(props.quantity);
    const [isEditable, setisEditable] = useState(false);
    const param = props.param;

    const fetch = async () => {
        const res = await axios.get(`http://127.0.0.1:5000/portfolio/${param}`, { withCredentials: true });
        if (res.status === 200) {
            setData({
                user: res.data.userID,
                portfolios: param,
                investments: res.data.investments,
                obj: res.data.val,
                options: res.data.options
            });
        }
    }

    const toggleIsEditable = () => setisEditable(!isEditable);


    const handleEdit = async (e) => {
        e.preventDefault();
        await axios.patch(`http://127.0.0.1:5000/portfolio/${param}`,
            {
                id: props.id,
                number: num
            }
            ,
            { withCredentials: true }
        )
        toggleIsEditable();
        await fetch();
    }

    const handleDelete = async () => {
        const res = await axios.post(`http://127.0.0.1:5000/portfolio/${param}/delete`, {
            id: props.id,
        },
            { withCredentials: true });
        await fetch();
    }

    const editableText = () => {
        return <>
            <td>
                <form onSubmit={handleEdit}>
                    <input type='number' value={num} onChange={(e) => setNum(e.target.value)}></input>
                    <button type="submit">Confirm</button>
                </form>
            </td>
        </>
    }

    const normalText = () => {
        return <>
            <td>{props.quantity}</td>
            <td><button onClick={toggleIsEditable}>Edit</button></td>
        </>
    }


    return <>
        <tr>
            <td>{props.name}</td>
            {!isEditable ? normalText() : editableText()}
            <td>${data.options.find((item)=>item.name===props.name).value}</td>
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    </>
}