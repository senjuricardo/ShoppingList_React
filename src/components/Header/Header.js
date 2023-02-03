import React from "react"
import './Header.css'
import shopping from '../../assets/images/shopping.png'
const Header = () => {

    return(
        <div className="Header">
            <h1>Shopping List</h1>
            <img src={shopping} alt="Shopping-img"/>
        </div>
    )
}

export default Header