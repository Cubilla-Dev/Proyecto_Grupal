
'use client'
import React, { useState } from 'react';
import { Box, Paper, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import AppBarComponent from '../components/AppBar';
import CssBaseline from '@mui/material/CssBaseline';




const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 260 : `-${0}px`
}))

const EarningPage = ({ handleDrawerClose }) => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleCloseDrawer = () => {
        setOpen(false);
        handleDrawerClose;
    };

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
                    component={Paper}
                    borderRadius="30px"
                    alignItems="center"
                >
                    <h1>Ultimos Movimientos</h1>
                </Stack>
            </Main>
        </Box>
    )
}

export default EarningPage;
