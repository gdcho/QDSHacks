import { StreamChat } from "stream-chat";
import { useSession } from 'next-auth/react';
// async function createChatRoom() {
//     const apiKey = 'w3pgxt7fwrmm';
//     const chatClient = new StreamChat(apiKey);

//     const channel = chatClient.channel('messaging', {
//         members: ['user_one_id_placeholder', 'user_two_id_placeholder'],
//         name: `${}`;
//     });
//     await channel.create();
// }

// export default createChatRoom;

async function createChatRoom(user_one_id: any, user_two_id: any) {
    const { data: session } = useSession();
    const apiKey = 'w3pgxt7fwrmm';
    const chatClient = new StreamChat(apiKey);
    const user_id = session?.user?.id || '';
    const userName = session?.user?.name || '';
    const userToken = session?.user?.token || '';

    console.log(user_id, userName, userToken, user_one_id, user_two_id);

    const user = {
        id: user_id,
        name: userName
    };

    if (user_id) {
        chatClient.connectUser(user, userToken);
        const channel = chatClient.channel('messaging', `${user_one_id}_and_${user_two_id}s_room`, {
            members: [user_one_id, user_two_id],
            name: `${user_one_id} and ${user_two_id}'s room`
        });
        await channel.create();
    }
}

export default createChatRoom;
