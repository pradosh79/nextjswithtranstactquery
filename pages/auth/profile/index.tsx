import React, { useEffect } from "react";
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
            
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
