'use client'
import React, { useState } from 'react';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';
import AppBarComponent from '../components/AppBar';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 260 : `-${0}px`
}))

const Home = ({ handleDrawerClose }) => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };


    const payments = [
        { imageSrc: '/alexSa.png', amount: '$100', date: '2024-02-24', company: "Alex S.A" },
        { imageSrc: '/bristol.jpg', amount: '$50', date: '2024-02-23', company: "Bristol s.A" },
        { imageSrc: '/tigo.png', amount: '$200', date: '2024-02-22', company: "Tigo S.a" }
    ];

    const movements = [
        { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '+ $155', date: '2024-02-24', user: "Brian Vera" },
        { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '+ $350', date: '2024-02-23', user: "Gustavo Cubilla" },
        { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '- $400', date: '2024-02-22', user: "Carlos Ibarra" }
    ];



    const handleCloseDrawer = () => {
        setOpen(false);
        handleDrawerClose;
    };
    const data = [
        { name: 'Enero', ingresos: 4000, egresos: 2000 },
        { name: 'Febrero', ingresos: 3000, egresos: 1500 },
        { name: 'Marzo', ingresos: 5000, egresos: 3000 },
        { name: 'Abril', ingresos: 4500, egresos: 2800 },
        { name: 'Mayo', ingresos: 6000, egresos: 3500 },
        { name: 'Junio', ingresos: 5500, egresos: 3200 },
    ];
    return (
        <Box>
            <CssBaseline />
            <AppBarComponent open={open} handleDrawerClose={handleCloseDrawer} handleDrawerOpen={handleDrawerOpen} />
            <Main
                open={open}
                sx={{
                    mt: "79px",
                    height: "848px",
                    backgroundColor: "#f3f5f9",
                    borderRadius: "50px",

                }}
            >
                <Stack
                    justifyContent="center"
                    direction="row"
                    spacing={3}
                >
                    <Stack width="70%"  >
                        <Stack spacing={3} direction="column" >
                            <Stack
                                borderRadius="30px"
                                component={Paper}
                                height="150px"
                                spacing={2}
                                pl="50px"
                                justifyContent="center"
                            >
                                <h4>Dinero Disponible</h4>
                                <h2>123.456 Gs</h2>
                                <h4>Cuenta número 817523-123</h4>
                            </Stack>
                            <Stack direction="row" spacing={3}>

                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        display: "flex",
                                        borderRadius: "30px"
                                    }}

                                >
                                    <h2>Pagos Recientes</h2>
                                    <Table
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around"
                                        }} >
                                        <TableBody sx={{
                                            display: "flex",
                                            flexDirection: "column",

                                        }}   >
                                            {payments.map((payments, idx) => (
                                                <TableRow key={idx} >
                                                    <TableCell sx={{ width: "130px" }} ><img width="40px" style={{ borderRadius: "50%" }} src={payments.imageSrc} /></TableCell>
                                                    <TableCell sx={{ width: "130px" }} > {payments.company}</TableCell>
                                                    <TableCell sx={{ color: "red", width: "130px" }} >-{payments.amount}</TableCell>
                                                    <TableCell  >{payments.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        flexDirection: "column",
                                        alignItems: "center",
                                        display: "flex",
                                        borderRadius: "30px",
                                        height: "500px"
                                    }}
                                >
                                    <h2>Ultimos Movimientos</h2>
                                    <Table
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            height: "700px"
                                        }}
                                    >
                                        <TableBody>
                                            {movements.map((movements, idx) => (
                                                <TableRow key={idx} >
                                                    <TableCell sx={{ color: "green", width: "130px" }}>{movements.icon}</TableCell>
                                                    <TableCell sx={{ width: "130px" }}>{movements.user}</TableCell>
                                                    <TableCell sx={{ width: "130px" }} >{movements.amount}</TableCell>
                                                    <TableCell >{movements.date}</TableCell>
                                                </TableRow>
                                            )
                                            )}

                                        </TableBody>
                                    </Table>

                                </TableContainer>
                            </Stack>
                        </Stack>
                    </Stack >
                    <Stack
                        component={Paper}
                        width="30%"
                        borderRadius="30px"
                        alignItems="center"
                        p="0 30px"
                        rowGap="50px"
                    >
                        <h1>Gráficos</h1>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="ingresos" stroke="#8884d8" />
                                <Line type="monotone" dataKey="egresos" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Stack>
                </Stack>
            </Main>
        </Box>
    )
}

export default Home;
