import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Grid
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endpoint";
import { registerProps } from "@/typeScripts/auth.interface";
import { userRegistration_verifyMutation } from '../../../customhooks/queries/auth.query.hooks';
import { useRouter  } from 'next/router';

export default function VerifyOTP() {
   const router = useRouter();
  const { handleSubmit } = useForm();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const { mutate, isPending } = userRegistration_verifyMutation();
  const otpRefs = useRef<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(storedUser);
      if (parsedUser.email) {
        setEmail(parsedUser.email);
      }
    }
  }, []);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/, ""); // Digits only
    if (!value) return;

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (index < 3 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const onSubmit = () => {
    const otp = otpValues.join("");
    // console.log(otp.length);
     setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("OTP:", otp, "Email:", email);

      const formdata = new URLSearchParams();
      formdata.append("otp", otp);
      formdata.append("email", email);
      mutate(formdata, {
        onSuccess: () => {
          localStorage.removeItem("user");
          router.push("/auth/login");
        },
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            title="Enter Verification Code"
            titleTypographyProps={{
              variant: "h5",
              textAlign: "center",
              fontWeight: "bold"
            }}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              py: 2,
              borderRadius: "8px 8px 0 0"
            }}
          />
          <CardContent>
            <Typography variant="body1" textAlign="center" mb={2}>
              Enter the 4-digit code sent to <strong>{email || "your email"}</strong>.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              display="flex"
              justifyContent="center"
            >
              <Grid container spacing={2} justifyContent="center">
                {[...Array(4)].map((_, index) => (
                  <Grid item key={index} xs={2}>
                    <TextField
                      inputRef={(el) => (otpRefs.current[index] = el)}
                      value={otpValues[index]}
                      onChange={(e) => handleOTPChange(e as React.ChangeEvent<HTMLInputElement>, index)}
                      inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        style: { textAlign: "center", fontSize: "1.5rem" }
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%", textAlign: "center" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
            </Button>

            {successMessage && (
              <Typography color="green" textAlign="center" mt={2}>
                {successMessage}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}