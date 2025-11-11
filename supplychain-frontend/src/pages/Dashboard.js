import React, { useEffect, useState, useContext } from "react";
import { getAllProducts, deleteProduct } from "../api/api"; // Dashboard.js
import { AuthContext } from "../context/AuthContext";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProducts = async () => {
  const data = await getAllProducts();
  const mapped = data.map((p) => ({ ...p, id: p._id })); // rename _id to id
  setProducts(mapped);
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <Container>
      <Typography variant="h4" my={3}>Dashboard</Typography>
      {user?.role !== "customer" && (
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate("/add-product")}>
          Add Product
        </Button>
      )}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Price: {product.price}</Typography>
                <Typography>Quantity: {product.quantity}</Typography>
                {user?.role !== "customer" && (
                  <>
                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => navigate(`/update-product/${product.id}`)}>
                      Update
                    </Button>
                    <Button variant="outlined" color="error" sx={{ mt: 1, ml: 1 }} onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
