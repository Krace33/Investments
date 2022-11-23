import React, { useState } from "react";
import axios from "axios";

export default function App() {
    const [res, setRes] = useState("Check Server");

    const check = async () => {
        setRes("Loading");
        const response = await axios.get('http://127.0.0.1:5000');
        console.log(response)
        const ans = response.data;
        setRes(ans);
    }

    return (
        <>
            <h1>This is the landing page</h1>
            <h3>{res}</h3>
            <button onClick={check}>Click me!!</button>
        </>
    )
}


