import { ChannelFilters, ChannelOptions, ChannelSort, StreamChat, User } from 'stream-chat';
import { useEffect, useState } from 'react';
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window,
    ChannelList,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { useSession } from 'next-auth/react';

export default function App() {
    const { data: session } = useSession();
    const user_id = session?.user?.id || '';
    const userName = session?.user?.name || '';
    const userToken = session?.user?.token || '';

    console.log(user_id, userName, userToken);

    const user = {
        id: user_id,
        name: userName
    };

    const apiKey = 'w3pgxt7fwrmm';
    const chatClient = new StreamChat(apiKey);

    const sort: ChannelSort = { last_message_at: -1 };
    const filters: ChannelFilters = {
        type: 'messaging',
        members: { $in: [user_id] },
    };
    const options: ChannelOptions = {
        limit: 10,
    };

    if (user_id) {
        chatClient.connectUser(user, userToken);
    }

    return (
        <Chat client={chatClient} theme='str-chat__theme-light'>
            <ChannelList filters={filters} sort={sort} options={options} />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
}
