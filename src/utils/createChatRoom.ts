import { StreamChat } from "stream-chat";

async function createChatRoom(
    user_id: any,
    userName: any,
    userToken: any,
    user_one_id: any,
    user_two_id: any,
    user_one_name: any,
    user_two_name: any
) {
    // const { data: session } = useSession();
    const apiKey = 'w3pgxt7fwrmm';
    const chatClient = new StreamChat(apiKey);
    // const user_id = session?.user?.id || '';
    // const userName = session?.user?.name || '';
    // const userToken = session?.user?.token || '';

    console.log(user_id, userName, userToken, user_one_id, user_two_id, user_one_name, user_two_name);

    const user_one_name_no_space = user_one_name.replace(/\s/g, "");
    const user_two_name_no_space = user_two_name.replace(/\s/g, "");

    console.log(user_one_name_no_space);
    console.log(user_two_name_no_space);

    const user = {
        id: user_id,
        name: userName
    };

    if (user_id) {
        chatClient.connectUser(user, userToken);
        const channel = chatClient.channel('messaging', `${user_one_name_no_space}_and_${user_two_name_no_space}s_room`, {
            members: [user_one_id, user_two_id],
            name: `${user_one_name_no_space} and ${user_two_name_no_space}'s room`
        });
        await channel.create();
    }
}

export default createChatRoom;