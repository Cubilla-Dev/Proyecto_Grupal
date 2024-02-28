'use client'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { login } from '@/app/api/route';
import { useCookies } from 'next-client-cookies';
import { setUser, userLogin } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Swal from 'sweetalert2'



const defaultTheme = createTheme();

const LoginForm = () => {

    const [errors, setErrors] = useState({});
    const cookies = useCookies();
    const dispatch = useAppDispatch();
    const router = useRouter();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        console.log(data)
        try {
            const result = await login(data);
            cookies.set("userToken", result.token);
            cookies.set("info", result.user._id)
            console.log(result.user._id);
            console.log(result);
            dispatch(userLogin());
            dispatch(setUser(result.user));
            Swal.fire({
                title: [`Bienvenido ${data.email}`],
                icon: "success"
            });
            setTimeout(() => {
               router.push("/");
            }, 1500);

        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.errors);
            Swal.fire({
                title: "Usuario no encontrado",
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField

                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#42826c", height: "56px", ":hover": { backgroundColor: "#34473a" } }}

                            >
                                Log In

                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="/passwordReset" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );

}

export default LoginForm;