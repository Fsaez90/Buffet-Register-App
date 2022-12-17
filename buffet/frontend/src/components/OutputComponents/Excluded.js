import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const Excluded = ({
                    room, 
                    setRegister, 
                    countIncluded,
                    setCountIncluded,
                    setDetailSection, 
                    setMessage,
                    setOpenModal
                }) => {
    
    let [roomId, setRoomId] = useState(room.id)
    const  navigate  = useNavigate();

   
    function submitRegister () {
        
        fetch("/api/update-room", {  
        method: "PATCH",
        headers: {    "Content-type": "application/json"  },
        body: JSON.stringify({
                id: roomId,
                Registered: true,
                Breakfast: true
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
                <div id="ExclusiveSection" className="inclusive-section">
                    <h2 className="excluded-title">Breakfast Not Included</h2>
                    <div className="inclusive">
                        <div className="reservation-details">
                            <p>Guest Name: {room.Name} {room.Lastname}</p>
                        </div>
                    <div className="reg-buttons">
                        <button onClick={() => setOpenModal(true)} >Form</button>
                        <button id='btn-rai' onClick={submitRegister}>Register as Included</button>
                    </div>
                    </div>
                </div>
            </div>
  )
}

export default Excluded
