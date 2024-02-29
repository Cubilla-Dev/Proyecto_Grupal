'use client'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import generateKey from '@/utils/generateKey';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Autocomplete, Avatar, ListItemAvatar, Stack, TextField, Typography } from '@mui/material';
import { stringAvatar } from '@/utils/avatarUtils';
import { Fragment, useEffect, useState } from 'react';
import { getChatByMembers, getChats, getUsers } from '@/app/api/route';

const drawerWidth = 350;

const menuOptions = [
    {
        email: "nestor@nestor.com",
        firstName: "Nestor",
        lastName: "Ribero",

    },
    {
        email: "nestor@nestor.com",
        firstName: "Nestor",
        lastName: "Ribero",

    },
]
const configOptions = [
]
const ChatItem = ({ item }) => {
    const router = useRouter();

    const navTo = (url) => {
        router.push(url);
    }

    return (
        <ListItem disablePadding
            onClick={() => navTo(`/chat/${item._id}`)}
            sx={{ borderBottom: "1px solid lightGray" }}
        >
            <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar {...stringAvatar(`${item.firstName} ${item.lastName}`)} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            fontWeight="bold"
                        >
                            {`${item.firstName} ${item.lastName}`}
                        </Typography>
                    }
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                You: {"This is a long text to be ellipsed if is out of a line"}
                            </Typography>

                        </Fragment>
                    }
                />
            </ListItemButton>
        </ListItem>
    )
}




const ChatsDrawer = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [chats, setChats] = useState([]);
    const [newChat, setNewChat] = useState(null);
    const [chatOpts, setChatOpts] = useState([]);

    const navTo = (url) => {
        router.push(url);
    }
    const isActive = (refPath) => {
        return pathname === refPath;
    }
    const handleGetChats = async () => {
        try {
            const response = await getChats();
            console.log(response);
            setChats(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleGetAvailableUsers = async () => {
        try {
            const response = await getUsers({ base: true, exclude: true });
            console.log(response);
            setChatOpts(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewChat = async (chatMember) => {
        setNewChat(chatMember);
        if (chatMember !== null) {
            console.log(chatMember);
            const params = new URLSearchParams(searchParams);
            Object.keys(chatMember).forEach((key) => {
                params.set(key, chatMember[key]);
            });
            try {
                const result = await getChatByMembers(chatMember._id);
                console.log(result);
                router.push(`/chat/${result._id}`);
            } catch (error) {
                console.log(error, "llegó");
                if (error.response.status == 404) {
                    router.push(`/chat?${params.toString()} `);
                }
            }
        }
    }


    useEffect(() => {
        handleGetAvailableUsers();
        handleGetChats();
    }, [])

    return (
        <Box   >
            <Drawer
                variant="permanent"
                sx={{

                    width: "248px",
                    flexShrink: 5,
                    [`& .MuiDrawer-paper`]: {
                        width: "249px",
                        boxSizing: 'border-box',
                        height: "100%",
                        zIndex: "1",
                        backgroundColor: "rgb(66 130 108)",
                        pt:"30px"
                    },

                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>


                    <List>
                        <ListItem>
                            <Stack sx={{ width: "100%", color:"black" }} direction="row" alignItems="center" spacing={2}>
                                <Typography variant='h6' textAlign={"center"} sx={{ fontWeight: "bolder" }}>Chats</Typography>
                                <Autocomplete
                                sx={{backgroundColor:"white"}}
                                    value={newChat}
                                    onChange={(event, newValue) => {
                                        handleNewChat(newValue)
                                    }}
                                    options={chatOpts}
                                    fullWidth
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder='Buscar Chat' />}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                />
                            </Stack>
                        </ListItem>
                        <Divider />
                        {chats.map((item, idx) => (
                            <Fragment key={generateKey(idx)}>
                                <ChatItem item={item} />
                            </Fragment>
                        ))}
                    </List>
                </Box>
                <Divider sx={{ mt: "auto" }} />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {configOptions.map((item, idx) => (
                            <ListItem key={generateKey(idx)} disablePadding
                                sx={{
                                    bgcolor: isActive(item.url) ? primary.light : "inherit",
                                    color: isActive(item.url) ? primary.contrastText : "inherit"
                                }}
                                onClick={() => navTo(item.url)}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {<item.icon style={{ color: isActive(item.url) ? primary.contrastText : "inherit" }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default ChatsDrawer;