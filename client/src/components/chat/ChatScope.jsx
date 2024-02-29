'use client'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";

import { Fragment, useEffect, useState } from "react";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { stringAvatar } from "@/utils/avatarUtils";
import { sendMessage, sendMessageMedia } from "@/app/api/route";
import { io } from "socket.io-client";

import { useCookies } from 'next-client-cookies';
import Message from "./Message";
import generateKey from "@/utils/generateKey";
import { MuiFileInput } from "mui-file-input";

import AttachFileIcon from '@mui/icons-material/AttachFile';


const ChatScope = (props) => {

    const [newMessages, setNewMessages] = useState([]);
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const cookies = useCookies();


    const handleFileChange = (newFile) => {
        setFile(newFile)
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("chatId", props._id);
        console.log(formData.get("img"))
        if (props.memberId) {
            formData.append("memberId", props.memberId);
        }
        console.log(formData.get("content"));
        try {
            const result = await sendMessage(formData);
            /* const result = await sendMessageMedia(formData); */
            console.log(result);
        } catch (error) {
            console.log(error);
        }

        setContent("");
    }


    useEffect(() => {
        // Create a socket connection
        const socket = io(`${process.env.REACT_APP_SOCKET_DOMAIN}/chat`, {
            withCredentials: true,
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
            extraHeaders: {
                "token": cookies.get("userToken")
            }
        });

        // Listen for incoming messages
        socket.on('direct', (payload) => {
            console.log(payload);
            setNewMessages((prevValue) => {
                prevValue.push(payload);
                return [...prevValue]
            })
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <Fragment>
            <Card elevation={4} sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor:"rgb(42 69 59)" }}>
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(`${props.firstName} ${props.lastName}`)} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={`${props.firstName} ${props.lastName}`}
                    subheader="Febrero 29, 2024"
                />

                <CardContent sx={{ backgroundImage :'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")', flex: 1 }}>
                    <Stack direction="column" spacing={2}>
                        {
                            props.messages?.map((item, idx) => {
                                return (
                                    <Message key={generateKey(`message${idx}`)} {...item} />
                                )
                            })
                        }
                        {
                            newMessages.map((item, idx) => {
                                return (
                                    <Message key={generateKey(`message${idx}`)} {...item} />
                                )
                            })
                        }
                    </Stack>
                </CardContent>

                <CardActions sx={{ pl: 2 }}>

                <Box component="form" onSubmit={handleSendMessage} sx={{ width: "100%", display: "flex" }} >
                        <TextField
                        sx={{backgroundColor:"white"}}
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            size="small"
                            placeholder="Type Something"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <IconButton type="submit" sx={{ ml: 2 }}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                    
                </CardActions>

            </Card>
        </Fragment >
    )
}

export default ChatScope;