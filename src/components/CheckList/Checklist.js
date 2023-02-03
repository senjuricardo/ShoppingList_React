import React from "react"
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react"
import './CheckList.css'
const CheckList = (props) => {
    const [sum, setSum] = useState(0);
    
     const deleteItem = () => {
       alert('COMING IN NEXT RELEASE, BE PATIENT YOU IDIOT')
     };
    useEffect(() => {
        const total = props.itemsList.reduce((acc = 0, item) => (acc + parseInt(item.price) * item.amount) , 0);
        setSum(total);
      }, [props.itemsList]);


    return (
        <div>

        
        <div className="Checklist">
             {Object.keys(props.itemsList).length !== 0 && <div className="headerList"><h3>ITEM</h3><h3>AMOUNT</h3><h3>PRICE/unit</h3></div>}
            {/* <button onClick={handleClick}>click me</button> */}
            <ul >
                {props.itemsList.map(item => (
                    <li className="bodyList"  key={uuidv4()}>
                        <div className="bodyList">
                        <div className="item">{item.item}</div>
                        <div className="amount">{item.amount}</div>
                        <div className="price">{item.price}</div> 
                        </div>
                        <button className="button3" onClick={deleteItem}>DELETE</button>
                        </li>
                ))}
            </ul>
        </div>
            {Object.keys(props.itemsList).length !== 0 && <div className="totalDiv"><p className="total">TOTAL TO PAY: {sum}</p></div>}
        </div>
    )

}

export default CheckList