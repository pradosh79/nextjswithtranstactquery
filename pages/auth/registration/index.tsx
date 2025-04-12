import React, { useState } from 'react'
import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endpoint";
import { registerProps } from "@/typeScripts/auth.interface";
import { registerMutation } from '../../../customhooks/queries/auth.query.hooks';
import { Paper, Typography, TextField, Button, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter  } from 'next/router';

export default function Registration() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { mutate, isPending } = registerMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (Data: FieldValues) => {
    const { first_name, last_name, email, password, profile_pic } = Data as { first_name: string, last_name: string, email: string; password: string, profile_pic: FileList };
    const formdata = new URLSearchParams();
    formdata.append("name", first_name + ' ' + last_name);
    formdata.append("email", email);
    formdata.append("password", password);

    mutate(formdata, {
      onSuccess: () => {

        router.push("/auth/verify_otp");
      },
    });
    console.log(formdata);
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item xs={0} md={6}>
          <Box
            sx={{
              height: "98vh",
              width: "57vw",
              backgroundImage: "url(https://pagedone.io/asset/uploads/1696488602.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              padding: 3,
              marginTop: "17vh",
              paddingRight: "-77vh",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} style={{ marginTop: "100px" }}>
          <Paper elevation={3} sx={{ padding: 3 }} style={{ maxWidth: "450px", margin: "0 auto" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Create an Account
            </Typography>
            <Typography variant="body2" align="center">
              Already have an account? <Link href="/auth/login">Login</Link>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    {...register("first_name", {
                      required: "First name is required",
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Invalid first name",
                      },
                    })}
                    label="First Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message as string}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...register("last_name", {
                      required: "Last name is required",
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Invalid last name",
                      },
                    })}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message as string}
                  />
                </Grid>
              </Grid>

              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email address",
                  },
                })}
                label="Email Address"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message as string}
              />

              <TextField
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "Password must be at least 8 characters long and include letters, numbers, and special characters",
                  },
                })}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message as string}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
