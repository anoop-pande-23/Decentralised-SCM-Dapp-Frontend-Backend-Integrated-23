import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export default function ProductFormDialog({ open, onClose, onSubmit, product }) {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? "Update Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="name" fullWidth sx={{ mb: 2 }} value={form.name} onChange={handleChange} />
        <TextField label="Price" name="price" fullWidth sx={{ mb: 2 }} value={form.price} onChange={handleChange} />
        <TextField label="Quantity" name="quantity" fullWidth value={form.quantity} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
