'use client'
import React, { useState } from 'react';
import { Box, Paper, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import AppBarComponent from '@/components/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import ChatsDrawer from '@/components/chat/ChatsDrawer';




const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${0}px`
}))



const ChatPage = ({ handleDrawerClose }) => {

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
        
            <AppBarComponent open={open} handleDrawerClose={handleCloseDrawer} handleDrawerOpen={handleDrawerOpen} />
            <Main
                open={open}
                sx={{
                    
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
                    <h1>Chats</h1>

                </Stack>
            </Main>
        </Box>
    )
}

export default ChatPage