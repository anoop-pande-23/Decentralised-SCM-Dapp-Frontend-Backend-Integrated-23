import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Blockchain DApp</Typography>
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>{user.role}</Typography>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
