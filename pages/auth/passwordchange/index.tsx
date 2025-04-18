import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { userpassword_updateMutation } from '@/customhooks/queries/auth.query.hooks';
import { useRouter } from 'next/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function PasswordChange() {
    const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate, isPending } = userpassword_updateMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [userid, setUserId] = useState("");
  
    useEffect(() => {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setUserId(user.id || "");
        } catch (err) {
          console.error("Failed to parse user from localStorage", err);
        }
      }
    }, []);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (Data: FieldValues) => {
    const { user_id, password } = Data as {
        user_id: string;
        password: string;
      };
  
      const formdata = new URLSearchParams();
      formdata.append("user_id", userid);
      formdata.append("password", password);
  
      mutate(formdata, {
        onSuccess: () => {
            localStorage.removeItem("user");  // ✅ clear localStorage user
            router.push("/auth/login");       // ✅ redirect to login
          },
          onError: (error: any) => {
            console.error("Password update failed:", error);
          }
      });
      };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h5" align="center" gutterBottom>
            Password Update
          </Typography>
        </Box>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={isPending}
                  endIcon={isPending && <CircularProgress size={20} />}
                >
                  {isPending ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
