'use client'
import ChatScope from "@/components/chat/ChatScope";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react"




const NewChatPage = () => {

    const searchParams = useSearchParams();
    const data = {
        _id: "NewChat",
        memberId: searchParams.get('_id'),
        firstName: searchParams.get('firstName'),
        lastName: searchParams.get('lastName'),
        email: searchParams.get('email'),
        messages: []
    }
    console.log(data);


    return (
        <Fragment>
            <Fragment>
                <ChatScope {...data} />
            </Fragment>
        </Fragment>
    )
}

export default NewChatPage;