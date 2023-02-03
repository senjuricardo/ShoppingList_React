import React from "react"
import './InputBuilder.css'
import { useState } from "react"
import CheckList from "../components/CheckList/Checklist"
const InputBuilder = () => {
    const [formData, setFormData] = useState({ item: '', amount: '', price: '' });
    const [ListItems, setListItems] = useState([])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setListItems([...ListItems, formData]);
        console.log(ListItems)
        console.log(formData);
    };

    return (
        <div >
            <form className="InputBuilder" onSubmit={handleSubmit}>
                <div className="input">
                    <label>Item</label>
                    <input type="text" name="item" value={formData.item} onChange={handleChange} placeholder="Insert an item" />
                </div>
                <div className="input">
                    <label>Amount</label>
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Insert an amount" />
                </div>
                <div className="input">
                    <label>Price item</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Insert a prince of an item" />
                </div>
                <button type="submit" className="glow-on-hover">Submit</button>
            </form> 
            <CheckList itemsList={ListItems}/>  
        </div>
    );

}

export default InputBuilder