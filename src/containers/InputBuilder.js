import React from "react"
import './InputBuilder.css'
import { useState, useEffect } from "react"
import CheckList from "../components/CheckList/Checklist"
const InputBuilder = () => {
    const [formData, setFormData] = useState({ item: '', amount: '', price: '' });
    const [ListItems, setListItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.price || formData.price < 0) {
            alert('please insert a price')
        }
        else {
            const sameItem = ListItems.findIndex(item => item.item === formData.item);
            if (sameItem >= 0) {
                const updatedListItems = [...ListItems];
                updatedListItems[sameItem].amount = Number(updatedListItems[sameItem].amount) + Number(formData.amount);
                // updatedListItems[sameItem].price = Number(formData.price);
                setListItems(updatedListItems);

            } else {
                setListItems([...ListItems, formData]);
            }
            setFormData({ item: '', amount: '', price: '' });
        }

    };

    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>An error occurred: {error.message}</div>;
      }
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
            <CheckList itemsList={ListItems} setListItems={setListItems} />
        </div>
    );

}

export default InputBuilder