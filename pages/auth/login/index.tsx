import React, { useState } from 'react'
import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endpoint";
import { loginMutation } from "../../../customhooks/queries/auth.query.hooks";
import { MutationFunction } from "@tanstack/react-query";
import { Paper, Typography, TextField, Button, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import { FieldValues, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter  } from 'next/router';


export default function LogIn() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate, isPending } = loginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
      };



    const onSubmit = async (formData: FieldValues) => {
        const { email, password } = formData as { email: string; password: string };
        const formdata = new URLSearchParams();
        formdata.append("email", email);
        formdata.append("password", password);
        mutate(formData, {
            onSuccess: () => {
                router.push("/cms/product_list");
            },
        });
        //console.log(formData);
        //router.push("/cms/list");
    };
    return (
        <>
            <Box sx={{ height: '100vh' }}>
                <Grid container spacing={2} sx={{ height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper elevation={3} sx={{ padding: 4, maxWidth: 450, width: '100%' }}>
                            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#4F46E5' }}>
                                Login Form
                            </Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                // error={!!errors.email}
                                // helperText={errors.email && errors.email.message}
                                />{errors.email && <span style={{ color: "red" }}>
                                    {errors.email && `*${errors.email.message}`}
                                </span>}

                                <TextField
                                    {...register("password", {
                                        required: "Password is required",
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
                                    sx={{ marginBottom: 2 }}
                                // error={!!errors.password}
                                // helperText={errors.password && errors.password.message}
                                />{errors.password && <span style={{ color: "red" }}>
                                    {errors.password && `*${errors.password.message}`}
                                </span>}



                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ padding: 1.5 }}
                                // disabled={loading}
                                >
                                    {isPending ? 'Please Wait...' : 'Log in'}

                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            height: '36vh',
                            width: '100%',
                            backgroundImage: 'url(https://pagedone.io/asset/uploads/1696488602.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderTopRightRadius: '16px',
                            borderBottomRightRadius: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            padding: 3,
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                                Login Page
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}
