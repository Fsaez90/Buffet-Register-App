import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import ButtonIncl from "./OutputComponents/ButtonIncl";
import ButtonExcl from "./OutputComponents/ButtonExcl";
import { Collapse } from "@material-ui/core"; 


const Summary = () => {
    const [room, setRoom] = useState([]);
    let [msg, setMsg] = useState("");
    let [render, setRender] = useState(true)


    useEffect(() => { 
        getDetails();    
    }, [render])
    
    let getDetails = async () => {
        //getting all guests info details
        let response = await fetch(`http://127.0.0.1:8000/api/`)
        let data = await response.json()
        setRoom(data)
    }
       
 return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <div className="table">
                <table>
                    <thead className="head">
                        <tr>
                            <th scope="col">Room</th>
                            <th scope="col">Name</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Breakfast</th>
                            <th scope="col">Adults</th>
                            <th scope="col">Children</th>
                            <th scope="col">status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                                {room.map((x) => {
                                return (
                                        <tbody>
                                            <tr>
                                                <td scope="row">{x.Room}</td>
                                                <td scope="row">{x.Name}</td>
                                                <td scope="row">{x.Lastname}</td>
                                                <td scope="row">{x.Breakfast? 'Yes': 'No'}</td>
                                                <td scope="row">{x.Adults}</td>
                                                <td scope="row">{x.Children}</td>
                                                <td scope="row">{x.Registered? '\u2705': '\u274c'}</td>
                                                <td scope="row">{x.Breakfast? <ButtonExcl render={render} setRender={setRender} id={x.id} Reg={x.Registered} setMsg={setMsg}/> : <ButtonIncl render={render} setRender={setRender} id={x.id} Reg={x.Registered} setMsg={setMsg} />}</td>
                                            </tr>
                                        </tbody>)
                                })}
                </table>
            </div>
            <br/>
            <br/>
            <Link to="/" className="back-btn"><h3>Back</h3></Link>
            <br />
            <Collapse className="alert-success" in={msg != ""}>{msg}</Collapse>
        </Grid>
    </Grid> 
 )

}

export default Summary