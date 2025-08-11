import React, { useState } from "react";
import axios from "axios";

function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/products", form)
      .then(() => {
        onAdd(); // refresh product list
        setForm({ name: "", quantity: "", price: "" });
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
