import React from "react";
import DigitButton from "./DigitButton";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@material-ui/core"; 



export const ACTIONS = {
    ADD_DIGIT: 'add_digit',
    DELETE_DIGIT: 'delete_digit',
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (payload.digit === "0" && state.roomNumber === "0") {
             return state
            }
            if(state.roomNumber.length > 2) {
                return state
            }
                return {
                    ...state,
                    roomNumber: `${state.roomNumber || ""}${payload.digit}`
                }
        case ACTIONS.DELETE_DIGIT:
            if(state.roomNumber == "") return state
            if(state.roomNumber.length === 1) {
                return { ...state, roomNumber: ""}
            }

            return {
                ...state,
                roomNumber: state.roomNumber.slice(0, -1)
            }
            
    }
}

export default function RoomInput({setDetailSection, message, setMessage, setUnregistered}) {        
    const [{roomNumber}, dispatch] = useReducer(reducer, {roomNumber: ""})
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/room/' + roomNumber)
    }
    setDetailSection(roomNumber)
    return (
        <div>
            <div className="room-input">
                <div className="output">
                    <form onSubmit={submitHandler} >
                        <input
                            placeholder="#ROOM"
                            className="room-number"
                            onChange={(e) => dispatch(e.target.value)}
                            value={roomNumber}/>
                    </form>
                </div>
                <div className="number-pad">
                    <DigitButton setUnregistered={setUnregistered} digit='1' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='2' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='3' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='4' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='5' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='6' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='7' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='8' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='9' dispatch={dispatch} />
                    <DigitButton setUnregistered={setUnregistered} digit='0' dispatch={dispatch} />
                    <button className="span-two" onClick={() => {
                        setMessage("")
                        //setUnregistered(false)
                        navigate("/")
                        dispatch({ type: ACTIONS.DELETE_DIGIT});
                        }}><p className="del">&#9003;</p></button>
                </div>
            </div>
            <br />
            <Collapse className="alert-success" in={message != ""}>{message}</Collapse>
        </div>
    )
    }


