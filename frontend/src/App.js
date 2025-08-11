import React, { useState } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const reload = () => setRefresh(!refresh);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Inventory Dashboard</h1>
      <AddProductForm onAdd={reload} />
      <ProductList key={refresh} />
    </div>
  );
}

export default App;
