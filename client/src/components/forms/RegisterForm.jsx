'use client'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { register } from '@/app/api/route';
import Link from 'next/link';
import { Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'


const defaultTheme = createTheme();

const RegisterForm = () => {

    const [errors, setErrors] = useState({});
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };
        console.log(data);
        try {
            const result = await register(data);
            console.log(result);
            Swal.fire({
                title: "Good job!",
                text: [`Bienvenido ${data.firstName}`],
                icon: "success",
                confirmButtonColor: "#34473a",
                iconColor: "#42826c",
            });
            setTimeout(() => {
                router.push("/login")
            }, 1500);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.errors);
            Swal.fire({
                title: ` Favor complete los campos`,
                icon: "error"
            });
        }
    };

    return (
        <ThemeProvider theme={defaultTheme} >
            <Grid container component="main" sx={{ height: '92vh', mt: "80px" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#2f3543' }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        error={Boolean(errors && errors.firstName)}
                                        helperText={errors && errors.firstName ? errors.firstName.message : ''}
                                        autoFocus
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        error={Boolean(errors && errors.lastName)}
                                        helperText={errors && errors.lastName ? errors.lastName.message : ''}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={Boolean(errors.email)}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Password Confirm"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        error={Boolean(errors.confirmPassword)}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#42826c", height: "56px", ":hover": { backgroundColor: "#34473a" } }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default RegisterForm;