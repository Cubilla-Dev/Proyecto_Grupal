import { selectUser } from "@/lib/features/users/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { Box, Stack, Typography } from "@mui/material";
import { Fragment } from "react"



const outgoingStyle = {
    bgcolor: "rgb(153 209 190)",
    width: "80%",
    alignSelf: "end",
    position: "relative",
    borderRadius: "8px 8px 0px 8px",
    padding: 1
}
const incomingStyle = {
    bgcolor: "white",
    width: "80%",
    alignSelf: "start",
    position: "relative",
    borderRadius: "8px 8px 8px 0px",
    padding: 1
}
const outgoingTriangleStyle = {
    width: 0,
    height: 0,
    borderLeft: "0px solid transparent",
    borderRight: "5px solid transparent",
    borderBottom: "10px solid rgb(153 209 190)",
    position: "absolute",
    bottom: 0,
    right: -4
}
const incomingTriangleStyle = {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "0px solid transparent",
    borderBottom: "10px solid white",
    position: "absolute",
    bottom: 0,
    left: -4
}

const Message = ({ content, sender }) => {
    const currentUser = useAppSelector(selectUser);
    const myMessage = sender._id === currentUser._id;



    return (
        <Stack color="black" >
            <Box sx={myMessage ? outgoingStyle : incomingStyle} >
                <Box sx={myMessage ? outgoingTriangleStyle : incomingTriangleStyle} />
                {/* <Typography>You:</Typography> */}
                <Typography variant="body2">{content}</Typography>

            </Box>
        </Stack >
    )
}

export default Message;