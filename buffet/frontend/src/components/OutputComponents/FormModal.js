import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function FormModal({
                open, 
                onClose,
                room, 
                setRegisterExcluded, 
                countExcluded, 
                setCountExcluded, 
                setDetailSection, 
                setMessage,
                setOpenModal,
                    }) {
    if(!open)  return null

    let [roomId, setRoomId] = useState(room.id)
    const  navigate  = useNavigate();

    
    function submitForm () {
        
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
    
        setRegisterExcluded(room.Adults)
        setCountExcluded(countExcluded + room.Adults)
        setOpenModal(false)
        setDetailSection("")
        navigate("/");
        
    }


  return (
    <div className='overlay'>
        <div className="modalContainer">
            <h2>Did the guest signed breakfast form?</h2>
            <div className='btns-popup'>
                <button className='btns-modal' onClick={onClose} >CANCEL</button>
                <button className='btns-modal' onClick={submitForm}>YES</button>
            </div>
        </div>
    </div>
  )
}

export default FormModal