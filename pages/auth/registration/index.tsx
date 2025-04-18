import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

import { registerMutation } from '@/customhooks/queries/auth.query.hooks';

export default function Registration() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate, isPending } = registerMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (Data: FieldValues) => {
    const { first_name, last_name, email, password } = Data as {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };

    const formdata = new URLSearchParams();
    formdata.append("name", `${first_name} ${last_name}`);
    formdata.append("email", email);
    formdata.append("password", password);

    mutate(formdata, {
      onSuccess: () => router.push("/auth/verify_otp"),
    });
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side Image */}
      {/* Image Section */}
                      <Grid item xs={12} md={6}>
                          <Box
                              sx={{
                                  height: { xs: 250, sm: 300, md: '100%' },
                                  width: '100%',
                                  backgroundImage: 'url(https://pagedone.io/asset/uploads/1696488602.png)',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  borderRadius: 3,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  px: 3,
                                  textAlign: 'center',
                                  color: 'white',
                              }}
                          >
                          </Box>
                      </Grid>

      {/* Right Side Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 450, width: '100%' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Login
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('first_name', {
                    required: 'First name is required',
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Invalid first name',
                    },
                  })}
                  label="First Name"
                  fullWidth
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message as string}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('last_name', {
                    required: 'Last name is required',
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Invalid last name',
                    },
                  })}
                  label="Last Name"
                  fullWidth
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message as string}
                />
              </Grid>
            </Grid>

            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email address',
                },
              })}
              label="Email Address"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />

            <TextField
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    'Password must be at least 8 characters long and include letters, numbers, and special characters',
                },
              })}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message as string}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isPending}
              endIcon={isPending && <CircularProgress size={20} />}
            >
              {isPending ? 'Registering...' : 'Submit'}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
