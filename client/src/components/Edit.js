import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik'
import * as yup from "yup"

function Edit({item, setItem, reset, items, setItems, popup3, setPopup3}) {

    const formik = useFormik({
        initialValues: {
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        description: item.description,
        },
        validationSchema: yup.object({
            name: yup.string().required("Must enter a name"),
            category: yup.string().required("Please select a category"),
            price: yup.number().positive(),
            description: yup.string().required("Please enter a description"),
        }),
        onSubmit: async (values, helpers) => {
            handlePatch(values)
            helpers.resetForm()
        }
    })

    const handlePatch = async (values, helpers) => {
        // console.log(item.id)
        const resp = await fetch(`/items/${item.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({name: values.name, category: values.category, price: values.price, image: values.image, description: values.description  })
        });
        const data = await resp.json();
        const updatedItems = items.map(i => {
            if (i.id === data.id) {
                return data
            } else {
                return i
            }
        })
        setItems(updatedItems)
        setPopup3(true)
        helpers.resetForm()
        
    }

    // console.log(formik.values)
return (
        <div className='edit-container'>
            <form className='edit-form' onSubmit={formik.handleSubmit} >
            <p className='form-title'>Edit your listing</p>
                <label className="form-label" htmlFor="name">Item Name</label>
                <input id='name' name='name' value={formik.values.name} onChange={formik.handleChange} />
                <p className='errors' style={{ color: "red" }}> {formik.errors.name}</p>
                <label className="form-label" htmlFor="category">Category</label>
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
                    <p className='errors' style={{ color: "red" }}> {formik.errors.category}</p>
                <label className="form-label" htmlFor="price">Price</label>
                <input id='price' name="price" value={formik.values.price} onChange={formik.handleChange}/>
                <p className='errors' style={{ color: "red" }}> {formik.errors.price}</p>
                <label className="form-label" htmlFor="image">Image</label>
                <input id='image' name="image" value={formik.values.image} onChange={formik.handleChange}/>
                <p className='errors' style={{ color: "red" }}> {formik.errors.image}</p>
                <label className="form-label" htmlFor="description">Description</label>
                <input id='description' name="description" value={formik.values.description} onChange={formik.handleChange}/>
                <p className='errors' style={{ color: "red" }}> {formik.errors.description}</p>
                <button className="btn" type='submit'>Save</button>

            </form>
        </div>
    )
}

export default Edit;