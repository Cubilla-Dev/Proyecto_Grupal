'use client'
import { Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { loginAdmin } from '@/app/api/route';
import { useRouter } from 'next/navigation';


/*  TODO:
*   -Redirect on login ok
*   -Handle Remember
*/


const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                HairApt
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const LoginFormAdmin = () => {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        try {
            const result = await loginAdmin(data);
            console.log(result);
            router.push('/miTienda'); // Redirigir a la página principal
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                  <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
                        {/* <img src="" alt="logo" style={{ width: 50 }} /> */}
                        <img  src="/virtualwallet.png" alt="logo" style={{ width: 50 }} />

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Bienvenido Wallet <br />
                        Por favor inicia sesión 
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordar contraseña"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/passwordReset" variant="body2">
                                    ¿Olvidaste la contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/registerAdmin" variant="body2">
                                    {"¿No tiene una cuenta? Crear cuenta"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </Fragment>
    );

}

export default LoginFormAdmin;

