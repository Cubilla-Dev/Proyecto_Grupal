'use client'
import { Box, CssBaseline, Toolbar, Typography, Button, IconButton, List, ListItem, ListItemText, Paper, Grid } from "@mui/material";
import { Add, Delete, Edit, Logout, Schedule } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";

export default function Home() {
    const router = useRouter(); 
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/service`);
                setServices(response.data);
            } catch (error) {
                console.error("Error al cargar los servicios:", error);
            }
        };

        fetchServices();
    }, []);

    const handleAddServiceClick = () => {
        router.push('/addCompany');
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_DOMAIN}/service/${id}`);
            setServices(services.filter(service => service._id !== id));
        } catch (error) {
            console.error("Error al eliminar el servicio:", error);
        }
    };

    const handleEditService = (id) => {
        router.push(`/editService/${id}`);
    };
    const handleLogout = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_DOMAIN}/admin/logout`, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: "100vh", width: "90vw", marginTop: '100px' }}>
            <CssBaseline />
            <Box sx={{ display: 'flex', width: "90vw", justifyContent: 'space-between' }} >
                <Toolbar />
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>Wallet Administración</Typography>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Empresas Adheridas</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="small"
                    sx={{ height: '40px', marginBottom: '20px' }}
                    onClick={handleAddServiceClick}
                >
                    Agregar empresas
                </Button>

                <Button
                    variant="contained"
                    startIcon={<Schedule />}
                    size="small"
                    sx={{ height: '40px', marginBottom: '20px' }}
                    >
                    <Link href={"/citas"}>Ver citas</Link>

                </Button>
                <IconButton onClick={handleLogout} color="inherit"> {/* Botón para cerrar sesión */}
                    <Logout />
                </IconButton>

            </Box>
            <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
                {services.map((service) => (
                    <Grid item key={service._id} xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                            <Typography variant="h6" gutterBottom>{service.name}</Typography>
                            <img src={service.imageUrl} alt={service.name} style={{ width: '70%', marginBottom: '10px' }} />
                            <Typography variant="body1" gutterBottom>{`Precio: ${service.price} - Duración: ${service.duration}`}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                                <IconButton onClick={() => handleEditService(service._id)} color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteService(service._id)} color="secondary">
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}