import React from "react"
import { useState, useEffect } from "react"
import './CheckList.css'
const CheckList = (props) => {
    const [sum, setSum] = useState(0);

    const deleteItem = (index) => {
        const updatedList = [...props.itemsList];
        const removedItem = updatedList.splice(index, 1);
        setSum(sum - removedItem[0].price * removedItem[0].amount);
        props.setListItems(updatedList);
    };
    // const deleteItem = (itemToDelete) => {
    //     const updatedList = props.itemsList.filter(item => item.item !== itemToDelete.item);
    //     props.setListItems(updatedList);
    // };


    useEffect(() => {
        const total = props.itemsList.reduce((acc = 0, item) => (acc + parseFloat(item.price) * item.amount), 0);
        setSum(total);
    }, [props.itemsList]);


    return (
        <>
            <table className="Checklist">
                <thead className="ChecklistHeader">
                    {Object.keys(props.itemsList).length !== 0 && <tr> 
                         <th className="firstTh">Name</th>
                        <th className="th">Amount</th>
                        <th className="th">Price/item</th>
                        <th className="th">Actions</th>
                    </tr>}

                </thead>
            <tbody className="tbody">
        {props.itemsList.map((item, index) => (
            <tr key={index} className="td">
            <td className="firstTh">{item.item}</td>
            <td className="td">{item.amount}</td>
            <td className="td">{item.price}</td>
            <td className="td"><button className="button3" onClick={() => deleteItem(index)}>DELETE</button></td>
          </tr>
        ))}
      </tbody>
        </table>
            {/* <div className="Checklist">
                {Object.keys(props.itemsList).length !== 0 && <div className="headerList"><h3>ITEM</h3><h3>AMOUNT</h3><h3>PRICE/unit</h3></div>}
                <ul >
                    {props.itemsList.map((item, index) => (
                        <li className="bodyList" key={index}>
                            <div className="bodyList">
                                <div className="item">{item.item}</div>
                                <div className="amount">{item.amount}</div>
                                <div className="price">{item.price}</div>
                            </div>
                            <button className="button3" onClick={() => deleteItem(index)}>DELETE</button>
                        </li>
                    ))}

                </ul>
            </div> */}
            
            {Object.keys(props.itemsList).length !== 0 && <div className="totalDiv"><p className="total">TOTAL TO PAY: {sum}€</p></div>}
        </>
    )

}

export default CheckList