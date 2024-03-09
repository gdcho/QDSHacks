import { StreamChat, User } from 'stream-chat';
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const userId = 'small-wildflower-0';
const userName = 'small-wildflower-0';

const user: User = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
};

const apiKey = "w3pgxt7fwrmm";
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic21hbGwtd2lsZGZsb3dlci0wIn0.3AISOHYD9EXDfaiBFceeTLZi86Z0J53LPbOY-aFPnb4';

const chatClient = new StreamChat(apiKey);
chatClient.connectUser(user, userToken);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
    // add as many custom fields as you'd like
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'Talk about React',
    members: [userId],
});

const ChatPage = () => (
    <Chat client={chatClient} theme='str-chat__theme-light'>
        <Channel channel={channel}>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
            </Window>
            <Thread />
        </Channel>
    </Chat>
);

export default ChatPage;
