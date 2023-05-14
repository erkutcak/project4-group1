import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as yup from "yup"
import '../Sell.css'
import Popup2 from "./Popup2";
import '../Popup2.css'
import logo from "../images/logo.png";

function Sell({ user, onLogin, addItem, setItems, items, popup2, setPopup2 }) {
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        console.log("FETCH! ");
        fetch("/items")
            .then((res) => res.json())
            .then((data) => {
            setItems(data);
        });
    }, [refreshPage]);
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name"),
        category: yup.string().required("Please select a category"),
        price: yup.number().positive(),
        description: yup.string().required("Please enter a description"),
    })

    const formik = useFormik({
        initialValues: {
            name:'',
            category:'',
            price:'',
            image:'',
            description:'',
            user_id: user.id,
            for_sale: 1
        },
        validationSchema: formSchema,
        onSubmit: async (values, helpers) => {
        fetch("items", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then(
            (res) => {
            if (res.status === 200){
                setRefreshPage(!refreshPage)
            }
        });
        setItems(items.concat(values))
        helpers.resetForm();
        setPopup2(true)
    },
});

return(
    <div className="sell-container">
        <img className="sell-logo" src={logo}/>
        <form className="listing-form" onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <p className="heading">Create a Listing</p>
        <label className="form-label" htmlFor="name">Name</label>
        <br />
        <input
        className="input"
        id="name"
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label className="form-label" htmlFor="category">Category</label>
        <br />
        <select id="category" name="category" onChange={formik.handleChange} value={formik.values.category}>
            <option disabled>Select a Category</option>
            <option>Beauty & Health</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Food & Beverage</option>
            <option>Furniture & Decor</option>
            <option>Household Items</option>
            <option>Pet Supplies</option>
            <option>Office Equipment</option>
            <option>Books</option>
            <option>Toys</option>
            <option>Sports & Outdoors</option>
            <option>Auto Parts</option>
        </select>
        <p style={{ color: "red" }}> {formik.errors.category}</p>
        <label className="form-label" htmlFor="price">Price</label>
        <br />
        <input
        className="input"
        id="price"
        type='number'
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
        />
        <p style={{ color: "red" }}> {formik.errors.price}</p>
        <label className="form-label" htmlFor="image">Image</label>
        <br />
        <input
        className="input"
        id="image"
        type="text"
        name="image"
        onChange={formik.handleChange}
        value={formik.values.image}
        />
        <p style={{ color: "red" }}> {formik.errors.image}</p>
        <label className="form-label" htmlFor="description">Description</label>
        <br />
        <input
        className="input"
        id="description"
        type="text"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>

        <button className="btn" type="submit">Submit</button>
        <Popup2 trigger={popup2} setTrigger={setPopup2}>
                    <h3>Your listing has been created!</h3>
        </Popup2> 
        </form> 
    </div>
)

}

export default Sell;