import React, { Component } from "react";
import Panel from "./Panel";
import Summary from "./Summary";
import {
    BrowserRouter as Router,
    Routes,
    Route,
}  from "react-router-dom"
import GuestData from "./GuestData";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
             <Router>
                <Routes>
                    <Route exact path="" element={<Panel />} />
                    <Route exact path="summary" element={<Summary />} />
                    <Route path="/room/:search" element={<Panel />} />                 
                </Routes>
             </Router>
        )
    }
}