import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Grid } from "@material-ui/core";
import RoomInput from "./RoomInput";
import GuestData from "./GuestData";



export default function Panel () {
    let [register, setRegister] = useState();
    let [registerExcluded, setRegisterExcluded] = useState()
    let [countIncluded, setCountIncluded] = useState(register)
    let [countExcluded, setCountExcluded] = useState(registerExcluded)
    let [detailSection, setDetailSection] = useState("")
    let [message, setMessage] = useState("")
    let [isRegistered, setIsRegistered] = useState()
    let [unregistered, setUnregistered] = useState(false)

    useEffect(() => {
        const data = Number(window.localStorage.getItem('register'))
        const data1 = Number(window.localStorage.getItem('registerExcluded'))
             setRegister(data)
             setRegisterExcluded(data1)
        const data2 = Number(window.localStorage.getItem('countIncluded'))
        const data3 = Number(window.localStorage.getItem('countExcluded'))
            setCountIncluded(data2)
            setCountExcluded(data3)
    }, [])

    useEffect(() => {
        window.localStorage.setItem('register', JSON.stringify(register))
        window.localStorage.setItem('registerExcluded', JSON.stringify(registerExcluded))
        window.localStorage.setItem('countIncluded', JSON.stringify(countIncluded))
        window.localStorage.setItem('countExcluded', JSON.stringify(countExcluded))
    }, [register, registerExcluded, countIncluded, countExcluded])
    
    if (detailSection === "") {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Nav setMessage={setMessage} register={register} countExcluded={countExcluded} countIncluded={countIncluded}/>
                    <RoomInput setUnregistered={setUnregistered} setDetailSection={setDetailSection}/>
                </Grid>
            </Grid> 
        )
    } else {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Nav setMessage={setMessage} countExcluded={countExcluded} register={register} countIncluded={countIncluded}/>
                    <RoomInput setDetailSection={setDetailSection} setUnregistered={setUnregistered} setMessage={setMessage} message={message}/>
                    <GuestData 
                        setRegister={setRegister}
                        setRegisterExcluded={setRegisterExcluded} 
                        setCountIncluded={setCountIncluded}
                        setCountExcluded={setCountExcluded}
                        countIncluded={countIncluded}
                        countExcluded={countExcluded}
                        setDetailSection={setDetailSection}
                        setMessage={setMessage}
                        setIsRegistered={setIsRegistered}
                        isRegistered={isRegistered}
                        unregistered={unregistered}
                        setUnregistered={setUnregistered}
                        />
                </Grid>
               
            </Grid> 
        )
    }
    
}