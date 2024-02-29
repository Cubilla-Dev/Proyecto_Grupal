import AppBarComponent from "@/components/AppBar";
import ChatsDrawer from "@/components/chat/ChatsDrawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { CookiesProvider } from "next-client-cookies/server";
import StoreProvider from "@/app/StoreProvider";



export default function RootLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', height: "100vh", width: "100vw" }}>

            <CssBaseline />
            <ChatsDrawer />
            <Box component="main" sx={{ flex: 1, p: 3, height: "100%", display: "flex", flexDirection: "column", overflowX: "hidden", bgcolor: "#2f3543" }}>
                <AppBarComponent />
                <Toolbar />
                <Box sx={{ flex: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
