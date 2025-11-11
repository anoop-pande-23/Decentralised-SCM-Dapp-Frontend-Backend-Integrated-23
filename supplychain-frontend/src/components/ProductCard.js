import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, userRole, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, p: 2 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>₹{product.price}</Typography>
        <Typography>Qty: {product.quantity}</Typography>

        <Button
          size="small"
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          View Details
        </Button>

        {(userRole === "vendor" || userRole === "admin") && (
          <>
            <Button size="small" sx={{ mt: 1, ml: 1 }} onClick={() => onEdit(product)}>Edit</Button>
            <Button size="small" color="error" sx={{ mt: 1, ml: 1 }} onClick={() => onDelete(product.id)}>Delete</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
