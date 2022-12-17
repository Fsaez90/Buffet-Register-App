import React, { useState } from 'react'

function ButtonExcl({id, Reg, setMsg, render, setRender}) {
    let [getId, setGetId] = useState(id);
    let [reg, setReg] = useState(Reg);

    function submitActionExcl () {

      if (Reg === false) {

        fetch("/api/update-room", {  
          method: "PATCH",
          headers: {    "Content-type": "application/json"  },
          body: JSON.stringify({
                  id: getId,
                  Registered: reg,
                  Breakfast: false,
                })
              }) .then(response => {
                  if(response.ok) {
                      setMsg("Room updated succesfully")
                      setRender(!render)
                      setTimeout(() => { setMsg(""); }, 2500)
                  } else {
                      setMsg("Room not updated")
                  }
              })

      } else {
        setMsg("Room is already registered, can't switch")
        setTimeout(() => { setMsg(""); }, 3000)
      }
        
    }


  return (
    <button className='btn-summ-exc' onClick={submitActionExcl}>Change to Excl.</button>
  )
}

export default ButtonExcl