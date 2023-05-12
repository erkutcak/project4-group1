import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"
import { useFormik } from 'formik'
import * as yup from "yup"


function Sell({ user, onLogin, addItem, setItems, items }) {
    const [refreshPage, setRefreshPage] = useState(false);
    // const [items, setItems] = useState([])

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
    // console.log(user.id);
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
        onSubmit: (values) => {
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
                alert("Item added successfully!")
            }
        });
        setItems(items.concat(values))
        },
    });

return(
    <div>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">Name</label>
        <br />
        <input
        id="name"
        type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>
        <label htmlFor="category">Category</label>
        <br />
        <select id="category" name="category" onChange={formik.handleChange} value={formik.values.category}>
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
        <label htmlFor="price">Price</label>
        <br />
        <input
        id="price"
        type='number'
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
        />
        <p style={{ color: "red" }}> {formik.errors.price}</p>
        <label htmlFor="image">Image</label>
        <br />
        <input
        id="image"
        type="text"
        name="image"
        onChange={formik.handleChange}
        value={formik.values.image}
        />
        <p style={{ color: "red" }}> {formik.errors.image}</p>
        <label htmlFor="description">Description</label>
        <br />
        <input
        id="description"
        type="text"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>

        <button type="submit">Submit</button>
        </form> 
    </div>
)

}

export default Sell;