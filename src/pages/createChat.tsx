import { StreamChat } from "stream-chat";

const createChat = async () => {
    const key = process.env.STREAM_API_KEY || '';
    const client = StreamChat.getInstance(key);

    await client.connectUser(
        {
            id: 'userOne',
            name: 'use one',
            image: 'https://i.imgur.com/fR9Jz14.png',
        },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3VybHktc3Vuc2V0LTkifQ.zH6e-ML2-SOTkXNuBkZ3S8fj4OK5AMMgwLGqjZcmiqA"
    )

    const channel = client.channel('messaging', {
        members: ['userOne', 'userTwo'],
        name: 'exampleChatOne'
    });
    await channel.create();
    console.log("chat created")
}

export default function createChatPage() {
    createChat();
    return (
        <div>
            <h1>create chatting</h1>
        </div>
    );
}