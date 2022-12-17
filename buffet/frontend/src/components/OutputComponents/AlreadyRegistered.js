import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const AlreadyRegistered = ({
                room,
                setRegister,
                countIncluded,
                setCountIncluded,
                setDetailSection,
                setMessage,
                setIsRegistered, 
                setUnregistered,
                setRegisterExcluded,
                setCountExcluded,
                countExcluded}) => {
 
    let [roomId, setRoomId] = useState(room.id)
    const  navigate  = useNavigate();

    function submitUnregister () {
        
        fetch("/api/update-room", {  
        method: "PATCH",
        headers: {    "Content-type": "application/json"  },
        body: JSON.stringify({
                id: roomId,
                Registered: false,
                Breakfast: room.Breakfast 
              })
            }) .then(response => {
                if(response.ok) {
                    setMessage("Guest unregistered succesfully")
                    setTimeout(() => { setMessage(""); }, 2500)
                } else {
                    setMessage("Guest not registered")
                }
            })
            if (room.Breakfast === true) {
                setRegister(room.Adults)
                setCountIncluded(countIncluded - room.Adults)
                setUnregistered(true)
                setIsRegistered(false)
                setDetailSection("")
                navigate("/");
            } else {
                setRegisterExcluded(room.Adults)
                setCountExcluded(countExcluded - room.Adults)
                setUnregistered(true)
                setIsRegistered(false)
                setDetailSection("")
                navigate("/");
            }
            
    }
  
    return (
        <div className='alr'>
            <h2 className='text-title'>Room already registered</h2>
            <div className='content'>
                <p className='p-content'>Guest Name: {room.Name} {room.Lastname}</p>
                <p className='p-content'>Room: {room.Room}</p>
            </div>
            <button className='btn-unregister' onClick={submitUnregister}>Unregister</button>
        </div>
  )
}
