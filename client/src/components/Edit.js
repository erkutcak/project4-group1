import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik'
import * as yup from "yup"

function Edit({item, reset}){
    
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
        onSubmit: (values) => {
           handlePatch(values)
        }
    })

    const handlePatch = (values) => {
        // console.log(item.id)
        fetch(`/items/${item.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({name: values.name, category: values.category, price: values.price, image: values.image, description: values.description  })
        });
        alert('Your item has been successfully changed!')
        reset();
    }
  
    // console.log(formik.values)
    

    return (
        <div>
            <h1>edit div</h1>
            <form onSubmit={formik.handleSubmit} >
                <input id='name' name='name' value={formik.values.name} onChange={formik.handleChange} />
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
                <input id='price' name="price" value={formik.values.price} onChange={formik.handleChange}/>
                <input id='image' name="image" value={formik.values.image} onChange={formik.handleChange}/>
                <input id='description' name="description" value={formik.values.description} onChange={formik.handleChange}/>
                <button type='submit'>submit</button>

            </form>
        </div>
    )
}

export default Edit;