import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

const ProductForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Product Name"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={form.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={form.quantity}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
