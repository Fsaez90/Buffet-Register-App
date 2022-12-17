import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const Included = ({room, setRegister, countIncluded, setCountIncluded, setDetailSection, setMessage}) => {
    let [roomId, setRoomId] = useState(room.id)
    const  navigate  = useNavigate();

    function submitRegister () {
        
        fetch("/api/update-room", {  
        method: "PATCH",
        headers: {    "Content-type": "application/json"  },
        body: JSON.stringify({
                id: roomId,
                Registered: true,
                Breakfast: room.Breakfast
              })
            }) .then(response => {
                if(response.ok) {
                    setMessage("Guest registered succesfully")
                    setTimeout(() => { setMessage(""); }, 2500)
                } else {
                    setMessage("Guest not registered")
                    
                }
            })
        
            setRegister(room.Adults); 
            setCountIncluded(countIncluded + room.Adults);
            setDetailSection("")
            navigate("/");
    }
  
    

  return (
    <div className="guest-data">
        <div id="InclusiveSection" className="inclusive-section">
            <h2 className="included-title">Breakfast Included</h2>
            <div className="inclusive">
                <div className="reservation-details">
                    <p>Guest Name: {room.Name} {room.Lastname}</p>
                    <p>Room: {room.Room}</p>
                    <p>Adults: {room.Adults}</p>
                    <p>Children: {room.Children}</p>
                    <p>Checkout: {room.Check_out}</p>
                </div>
                <div className="reg-buttons">
                    <button onClick={submitRegister}>Register</button>
                    <button>Register 1</button>
                    <button>Register 2</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Included