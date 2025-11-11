import React, { useState } from "react";
import { addProduct } from "../api/api"; // AddProduct.js
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ name, price, quantity });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" my={3}>Add Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
