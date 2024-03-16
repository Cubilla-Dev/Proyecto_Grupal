'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';
import AppBarComponent from '../components/AppBar';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'; // Importa los componentes necesarios para el gráfico de barrasimport { useCookies } from 'next-client-cookies';
import { getUserWallet, getUserHistoryTranf } from '@/app/api/route';
import AppContext from '@/app/AppContext';
import { useCookies } from 'next-client-cookies';




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
    //actualizar datos despues de un submit
    const context=useContext(AppContext)
    console.log(context);

    //obtener dinero en cuenta
    const [efectivo, setEfectivo] = useState(undefined)
    const [id, setId] = useState(undefined)
    const [historyTranf, setHistoryTranf] = useState([])
    const [historyTranfServicio, setHistoryTranfServicio] = useState([]); // Paso 1: Agregar estado para historyTranfServicio

    const cookies = useCookies();

    useEffect(() => {
        //obteer el id
        const cookieInfo = cookies.get("info");
        const fetchData = async () => {
            try {
                if (cookieInfo) {
                    const resultHistory = await getUserHistoryTranf(cookieInfo);
                    const resultHistoryServicio = await getUserHistoryTranfServicio(cookieInfo);
                    const result = await getUserWallet(cookieInfo);
                    // console.log("Saldo de la billetera:", result.walletBalance);
                    setHistoryTranf(resultHistory.data)
                    setHistoryTranfServicio(resultHistoryServicio.data)
                    setHistoryTranfServicio(resultHistoryServicio.data); // Paso 2: Actualizar el estado de historyTranfServicio con los datos obtenidos
                    setEfectivo(result.walletBalance)
                    setId(cookieInfo)
                    context.setStateContext(false)
                }
            } catch (error) {
                console.error("Error al obtener el saldo de la billetera:", error);
            }
        };
        fetchData();
    }, [cookies, efectivo, context.stateContext]);


    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // const payments = [
    //     { imageSrc: '/alexSa.png', amount: '$100', date: '2024-02-24', company: "Alex S.A" },
    //     { imageSrc: '/bristol.jpg', amount: '$50', date: '2024-02-23', company: "Bristol s.A" },
    //     { imageSrc: '/tigo.png', amount: '$200', date: '2024-02-22', company: "Tigo S.a" }
    // ];

    // const movements = [
    //     { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '+ $155', date: '2024-02-24', user: "Brian Vera" },
    //     { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '+ $350', date: '2024-02-23', user: "Gustavo Cubilla" },
    //     { icon: <AccountBalanceOutlinedIcon fontSize='large' />, amount: '- $400', date: '2024-02-22', user: "Carlos Ibarra" }
    // ];

    const handleCloseDrawer = () => {
        setOpen(false);
        handleDrawerClose;
    };
    const dataIngresos = [
        { name: 'Enero', Ingresos: 4000, },
        { name: 'Febrero', Ingresos: 3000, },
        { name: 'Marzo', Ingresos: 5000, },
        { name: 'Abril', Ingresos: 4500, },
        { name: 'Mayo', Ingresos: 6000, },
        { name: 'Junio', Ingresos: 5500, },
    ];
    const dataEgresos = [
        { name: 'Enero', Pagos: 2000, },
        { name: 'Febrero', Pagos: 1000, },
        { name: 'Marzo', Pagos: 6500, },
        { name: 'Abril', Pagos: 7500, },
        { name: 'Mayo', Pagos: 2000, },
        { name: 'Junio', Pagos: 4500, },
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
                    borderEndStartRadius: "50px",

                }}
            >
                <Stack
                    justifyContent="center"
                    direction="row"
                    spacing={3}
                >
                    <Stack width="70%"  >
                        <Stack spacing={3} direction="column" >

                            <Stack spacing={3} direction="column">
                                <Stack
                                    borderRadius="30px"
                                    component={Paper}
                                    height="150px"
                                    spacing={2}
                                    pl="50px"
                                    justifyContent="center"
                                >
                                    <h4>Dinero Disponible</h4>
                                    <h2>{efectivo} Gs</h2>
                                    <h4>Numero de Cuenta: {id}</h4>
                                </Stack>
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
                                    <h2>Pagos de Servicios</h2>
                                    <Table
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around"
                                        }} >
                                        <TableBody sx={{
                                            display: "flex",
                                            flexDirection: "column",

                                        }}   >
                                            {historyTranfServicio.map((servicio, idx) => (
                                                <TableRow key={idx} >
                                                    <TableCell sx={{ width: "130px" }} ><img width="40px" style={{ borderRadius: "50%" }} src={servicio.imageSrc} /></TableCell>
                                                    <TableCell sx={{ width: "130px" }} > {servicio.nbr_completo_destina}</TableCell>
                                                    <TableCell sx={{ color: "red", width: "130px" }} >-{servicio.monto}</TableCell>
                                                    <TableCell  >{servicio.createdAt}</TableCell>
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
                                            {historyTranf.map((history, idx) => (
                                                
                                                <TableRow key={idx} >
                                                    <TableCell sx={{ color: "green", width: "130px" }}><AccountBalanceOutlinedIcon fontSize='large' />
                                                    </TableCell>
                                                    <TableCell sx={{ width: "130px" }}>{history.nbr_completo_destina}</TableCell>
                                                    <TableCell sx={{ width: "130px" }} >{history.monto}</TableCell>
                                                    <TableCell >{history.date}</TableCell>
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
                        pt="30px"
                        pb="30px"
                    >
                        <h1>Gráfico de Transferencias</h1>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                width={500}
                                height={300}
                                data={historyTranf}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="monto" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Stack>

                </Stack>
            </Main>
        </Box>
    )
}

export default Home;