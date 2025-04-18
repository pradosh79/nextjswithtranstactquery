import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function Profile(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setName(user.name || "");
        setEmail(user.email || "");
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ width: 80, height: 80 }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
        </Box>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
          {name || "Name not available"}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
          {email || "Email not available"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
