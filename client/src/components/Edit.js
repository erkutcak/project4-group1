import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik'
import * as yup from "yup"

function Edit({item, setItem, reset, items, setItems}) {

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

    const handlePatch = async (values) => {
        // console.log(item.id)
        const resp = await fetch(`/items/${item.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({name: values.name, category: values.category, price: values.price, image: values.image, description: values.description  })
        });
        const data = await resp.json();
        alert('Your item has been successfully changed!')
        const updatedItems = items.map(i => {
            if (i.id === data.id) {
                return data
            } else {
                return i
            }
        })
        setItems(updatedItems)
        console.log(updatedItems);
        console.log(items);
        
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