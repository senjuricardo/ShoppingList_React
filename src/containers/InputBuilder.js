import React from "react"
import './InputBuilder.css'
import { useState, useEffect } from "react"
import CheckList from "../components/CheckList/Checklist"
const InputBuilder = () => {
    const [formData, setFormData] = useState({ item: '', amount: '', price: '' });
    const [ListItems, setListItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [isFormDisabled, setIsFormDisabled] = useState(false);


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.price || formData.price < 0 || !formData.amount || formData.amount <= 0) {
            alert('please fill all fields with proper information')
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
                setData(result.products);
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
        <>
        <div className="InputBuilder">
            <div className="input">
                <label className="cool-label">Items</label>
                <select className="cool-form" value={data.title} onChange={event => {
                    console.log(event)
                    setFormData({
                        ...formData,
                        item: event.target.options[event.target.selectedIndex].text,
                        price: event.target.value,
                    });
                }}>
                    {data.map(item => (
                        <option key={item.id} value={item.price}>{item.title}</option>
                    ))}
                </select>
            </div>
                
            
            <form className="InputBuilder" onSubmit={handleSubmit}>
                <div className="input">
                    <label className="cool-label">Amount</label>
                    <input className="cool-form" type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Insert an amount" />
                </div>
                <div className="input">
                    <label className="cool-label">Price item</label>
                    <input className="cool-form" type="number" name="price" disabled="false" value={formData.price} onChange={handleChange} placeholder="Insert a prince of an item" />
                </div>
                <button type="submit" className="glow-on-hover">Submit</button>
            </form>
        </div>
            <CheckList itemsList={ListItems} setListItems={setListItems} />
        </>
    );

}

export default InputBuilder