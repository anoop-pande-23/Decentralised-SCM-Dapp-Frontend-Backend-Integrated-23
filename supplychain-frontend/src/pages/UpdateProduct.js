import React, { useEffect, useState } from "react";
import { updateProduct, getProductById } from "../api/api"; // UpdateProduct.js
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductById(id);
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, { name, price, quantity });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" my={3}>Update Product</Typography>
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
          Update Product
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProduct;
