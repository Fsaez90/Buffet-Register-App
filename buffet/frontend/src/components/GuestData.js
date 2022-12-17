import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Included from "./OutputComponents/Included";
import Excluded from "./OutputComponents/Excluded";
import NotFound from "./OutputComponents/NotFound";
import { AlreadyRegistered } from "./OutputComponents/AlreadyRegistered";
import FormModal from "./OutputComponents/FormModal";


 const GuestData = ({
                setRegister,
                setRegisterExcluded, 
                setCountIncluded,
                setCountExcluded, 
                countIncluded,
                countExcluded, 
                setDetailSection, 
                setMessage, 
                setIsRegistered, 
                isRegistered, 
                unregistered, 
                setUnregistered,
                }) => {
    
    let {search} = useParams();
    let [room, setRoom] = useState("");
    let [notExist, setNotExist] = useState();
    let [breakfast , setBreakfast] = useState();
    let [openModal, setOpenModal] = useState(false)

    
    useEffect(() => {
        getRoom()
    
    }, [search, notExist, breakfast])
    
    let getRoom = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/room/${search}`)
        if (response.status === 404) {
            setNotExist(true);
        } else {
            setNotExist(false)
        }
        
        let data = await response.json()
        setRoom(data)
        setIsRegistered(data.Registered)
        if (data.Breakfast === true) {
            setBreakfast(true)
        } else {
            setBreakfast(false)
        }
    }
    

    if (notExist === true) {
        return (<NotFound />)
    } else if (breakfast === true && isRegistered === false && unregistered === false) {
        return (<Included 
                    setRegister={setRegister} 
                    room={room}
                    countIncluded={countIncluded}
                    setCountIncluded={setCountIncluded}
                    setDetailSection={setDetailSection}
                    setMessage={setMessage}
                    setUnregistered={setUnregistered}
                />) 
    } else if (breakfast === false && isRegistered === false && unregistered === false) {
        return (
            <div>
                <Excluded 
                        room={room}
                        setRegister={setRegister}
                        setRegisterExcluded={setRegisterExcluded}
                        countIncluded={countIncluded}
                        countExcluded={countExcluded}
                        setCountIncluded={setCountIncluded}
                        setCountExcluded={setCountExcluded}
                        setDetailSection={setDetailSection}
                        setMessage={setMessage}
                        setUnregistered={setUnregistered}
                        setOpenModal={setOpenModal}
                    />
                    <FormModal 
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        room={room}
                        setRegister={setRegister}
                        setRegisterExcluded={setRegisterExcluded}
                        countIncluded={countIncluded}
                        countExcluded={countExcluded}
                        setCountIncluded={setCountIncluded}
                        setCountExcluded={setCountExcluded}
                        setDetailSection={setDetailSection}
                        setMessage={setMessage}
                        setUnregistered={setUnregistered}
                        setIsRegistered={setIsRegistered}
                        setOpenModal={setOpenModal}
                    />
                </div>
                ) 
    } else if (isRegistered === true && unregistered === false) {
        return (
            <AlreadyRegistered  
                    room={room}
                    setRegister={setRegister}
                    countIncluded={countIncluded}
                    countExcluded={countExcluded}
                    setRegisterExcluded={setRegisterExcluded}
                    setCountIncluded={setCountIncluded}
                    setCountExcluded={setCountExcluded}
                    setDetailSection={setDetailSection}
                    setMessage={setMessage}
                    setIsRegistered={setIsRegistered}
                    setUnregistered={setUnregistered} 
                />)
    } else {
        return (<div className="guest-data"></div>)
    }
}

export default GuestData