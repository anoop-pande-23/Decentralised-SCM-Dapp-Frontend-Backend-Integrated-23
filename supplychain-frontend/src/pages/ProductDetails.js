import React, { useEffect, useState } from "react";
import { getProductById } from "../api/api"; // ProductDetails.js
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
  const data = await getProductById(id);
  setProduct({ ...data, id: data._id }); // rename _id to id
};

    fetchData();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" my={3}>{product.name}</Typography>
      <Typography>Price: {product.price}</Typography>
      <Typography>Quantity: {product.quantity}</Typography>
    </Container>
  );
};

export default ProductDetails;
