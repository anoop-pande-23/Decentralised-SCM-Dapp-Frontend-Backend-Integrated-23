// src/pages/Events.js
import React from "react";
import { Container, Typography } from "@mui/material";

export default function Events() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Events Page</Typography>
      <Typography>Blockchain events (added, updated, deleted) will be shown here.</Typography>
    </Container>
  );
}
