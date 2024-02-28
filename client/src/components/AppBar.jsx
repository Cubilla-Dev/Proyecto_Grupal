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
import { Paper, List, Typography, Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { clearUser, selectLogged, userLogout } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/api/route';

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
    const isLogged = useAppSelector(selectLogged);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const handleRedirect = (route) => () => {
        router.push(route);
    }


    const handleLogout = async () => {
        try {
            const result = await logout();
            console.log(result);
            dispatch(userLogout());
            dispatch(clearUser());
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                backgroundColor: "rgb(66 130 108)",
                boxShadow: "none",
                height: "80px"

            }}>
                <Toolbar >
                    <IconButton
                        color="white"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none', }), }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack direction="row" spacing={130}>
                        <Typography variant="h6" noWrap component="div">
                            <img height="70px" src="https://z5vdccfn-8000.brs.devtunnels.ms/images/image-6.png" alt="logo" />
                        </Typography>

                        {
                            !isLogged ?
                                <Button onClick={handleRedirect("/login")} color='inherit'>Login</Button>
                                :

                                <Button onClick={handleLogout} color='inherit'>Logout</Button>
                        }
                    </Stack>

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
                    {['Dashboard', 'Movements', 'Payments'].map((text, index) => (
                        <ListItem
                            sx={{ width: "250px" }}
                            key={text}
                            onMouseOver={(e) => e.currentTarget.style.color = 'whitesmoke'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#6e7a9a'}
                        >
                            <ListItemButton
                                component="a"
                                href={index === 0 ? "/" : index === 1 ? "/movementsPage" : "/paymentsPage"}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(66 130 108)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                            >
                                <ListItemIcon>
                                    {index === 0 ? <HomeOutlinedIcon /> : index === 1 ? <CurrencyExchangeOutlinedIcon /> : <PaymentsOutlinedIcon />}
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
