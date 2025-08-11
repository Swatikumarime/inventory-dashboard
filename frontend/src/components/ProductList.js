import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", quantity: "", price: "" });

  const loadProducts = () => {
    axios.get("http://localhost:8080/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/api/products/${id}`)
      .then(() => loadProducts())
      .catch(err => console.error("Error deleting product:", err));
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      quantity: product.quantity,
      price: product.price
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = (id) => {
    axios.put(`http://localhost:8080/api/products/${id}`, {
      name: editForm.name,
      quantity: parseInt(editForm.quantity),
      price: parseFloat(editForm.price)
    })
    .then(() => {
      setEditId(null);
      loadProducts();
    })
    .catch(err => console.error("Error updating product:", err));
  };

  return (
    <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>
              {editId === p.id ? (
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              ) : (
                p.name
              )}
            </td>
            <td>
              {editId === p.id ? (
                <input
                  name="quantity"
                  type="number"
                  value={editForm.quantity}
                  onChange={handleEditChange}
                />
              ) : (
                p.quantity
              )}
            </td>
            <td>
              {editId === p.id ? (
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
              ) : (
                p.price
              )}
            </td>
            <td>
              {editId === p.id ? (
                <>
                  <button onClick={() => saveEdit(p.id)} style={{ backgroundColor: "green", color: "white" }}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button onClick={() => deleteProduct(p.id)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
