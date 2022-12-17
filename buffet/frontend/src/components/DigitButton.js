
import React, { Component } from "react";
import { ACTIONS } from "./RoomInput"

export default function DigitButton({ dispatch, digit, setUnregistered}) {

    function setter () {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })
        setUnregistered(false)
    }


    return (
        <button 
            onClick={setter}
        >
            {digit}
        </button>
    )
}