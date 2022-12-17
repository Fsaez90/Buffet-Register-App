import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/static/images/logo.png"
 

const Nav = ({countIncluded, countExcluded}) => {

    const [clock, setClock] = useState();
    const [date, setDate] = useState();
    const [included, setIncluded] = useState("-");
    const [excluded, setExcluded] = useState();

    
    useEffect(() => { 
        getTotal();  
        setInterval(() => {
            const date = new Date();
            setClock(date.toLocaleTimeString());
            setDate(date.toLocaleDateString());
        }, 1000);

              
    }, [])
   
    let getTotal = async () => {
        //getting all guests info details
        let response = await fetch(`http://127.0.0.1:8000/api/`)
        let data = await response.json()

        //filtering guests info whose are entitled for buffet
        const breakfastTrue = data.filter((data) => {
            return data.Breakfast === true;
        })
        //filtering guests info whose are entitled for buffet
        const breakfastFalse = data.filter((data) => {
            return data.Breakfast === false;
        })
        //Getting the total number of adults of included rooms
        const totalIncluded = breakfastTrue.reduce((acc, cur) => {
            return acc + cur.Adults
        }, 0)
        setIncluded(totalIncluded)
        //Getting the total number of adults of excluded rooms
        const totalExcluded = breakfastFalse.reduce((acc, cur) => {
            return acc + cur.Adults
        }, 0)
        //setExcluded(totalExcluded)
        //let grandTotal = totalIncluded + totalExcluded
    }
    
    


  return (
    <div className="nav-bar">
        <div className="logo-datetime">
            <div className="logo">
                <img className="logotype" src={logo} />
            </div>
            <div className="datetime">
                <h4>{date}</h4><br></br>
                <h4>{clock}</h4>
            </div>
        </div>
        <div className="counters">
            <h2>Included: {countIncluded <= 0? 0 : countIncluded}</h2><br></br>
            <h2>To-go: {(included - countIncluded) >= included? included : (included - countIncluded)}</h2><br></br>
            <h4>Total: {included}</h4><br></br>
        </div>
        <div className="exc-summary">
            <div className="exclusive">
                <h2>Excluded: {countExcluded <=0? 0 : countExcluded}</h2>
            </div>
            <Link to="/summary" className="summary-btn"><h3>Summary</h3></Link>
        </div>
    </div>
  )
}

export default Nav