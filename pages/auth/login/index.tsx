import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, FieldValues } from 'react-hook-form';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginMutation } from '../../../customhooks/queries/auth.query.hooks';
import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';

export default function LogIn() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate, isPending } = loginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (formData: FieldValues) => {
        const { email, password } = formData as { email: string; password: string };
        mutate(formData, {
            onSuccess: () => {
                router.push('/cms/product_list');
            },
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: { xs: 4, md: 10 }, px: { xs: 2, sm: 4 } }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                {/* Login Form Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, maxWidth: 500, mx: 'auto' }}>
                        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#4F46E5' }}>
                            Login Page
                        </Typography>

                        <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
                            Login using your registered email and password.
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                            />
                            {errors.email && (
                                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                                    *{String(errors.email.message)}
                                </Typography>
                            )}

                            <TextField
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                sx={{ marginBottom: 2 }}
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
                            {errors.password && (
                                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                                    *{String(errors.password.message)}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ padding: 1.5 }}
                            >
                                {isPending ? 'Please Wait...' : 'Log in'}
                            </Button>
                        </form>
                        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                            Don&apos;t have an account?{' '}
                            <MuiLink
                                component={NextLink}
                                href="/auth/registration"
                                underline="hover"
                                sx={{ color: '#4F46E5', fontWeight: 500 }}
                            >
                                Register
                            </MuiLink>
                        </Typography>
                    </Paper>
                </Grid>

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
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
                        >
                            Login Page
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
