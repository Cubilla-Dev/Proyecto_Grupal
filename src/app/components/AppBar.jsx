'use client'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import { Paper, List, Typography } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 260;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,

    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',


}));

const AppBarComponent = ({ open, handleDrawerClose, handleDrawerOpen }) => {
    const theme = useTheme();


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                backgroundColor: "rgb(66 130 108)",
                boxShadow: "none",

            }}>
                <Toolbar>
                    <IconButton
                        color="white"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none', }), }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <img height="70px" src="/virtualwallet.png" alt="logo" />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        mt: "1px",
                        border: "none",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <Paper
                        elevation={2}
                        sx={{
                            width: "100%",
                            backgroundColor: "#f3f5f9",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            pl: "10px",
                            columnGap: "25px",
                            p: "10px 10px"
                        }}
                    >
                        <img
                            src="https://learnyzen.com/wp-content/uploads/2017/08/test1-481x385.png" alt="jonhg doe"
                            height="55px"

                            style={{
                                borderRadius: "30px",
                            }}
                        />
                        John Doe
                    </Paper>
                    <IconButton onClick={handleDrawerClose}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgb(66 130 108)"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List sx={{ color: "#6e7a9a", display: "flex", flexDirection: "column", alignItems: "center", mt: "40px" }}>
                    {['Dashboard', 'Earning', 'Payments'].map((text, index) => (
                        <ListItem
                            sx={{ width: "250px" }}
                            key={text}

                            onMouseOver={(e) => e.currentTarget.style.color = 'whitesmoke'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#6e7a9a'}
                        >
                            <ListItemButton
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(66 130 108)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            >
                                <ListItemIcon>
                                    {index === 0 ? <Link href="/dashboardPage" > <HomeOutlinedIcon /></Link> : index === 1 ? <Link href="/earningPage"><CurrencyExchangeOutlinedIcon /></Link> : <Link href="/paymentsPage"> <PaymentsOutlinedIcon /></Link>}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <List sx={{ display: "flex", justifyContent: "center" }}>
                    {['Contact Us'].map((text, index) => (
                        <ListItem
                            sx={{ color: "whitesmoke", mt: "300px", backgroundColor: "rgb(66 130 108)", width: "200px", height: "120px", borderRadius: "20px" }}
                            key={text} disablePadding>
                            <ListItemButton >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <PhoneForwardedOutlinedIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default AppBarComponent;
