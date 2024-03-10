import { StreamChat } from "stream-chat";
import { useSession } from "next-auth/react";
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

async function createChatRoom(
  user_id: any,
  userName: any,
  userToken: any,
  user_one_id: any,
  user_two_id: any
) {
  // const { data: session } = useSession();
  const apiKey = "w3pgxt7fwrmm";
  const chatClient = new StreamChat(apiKey);

  // Ensure user IDs are provided and are strings
  if (typeof user_one_id !== "string" || typeof user_two_id !== "string") {
    console.error("Invalid user IDs provided. Both user IDs must be strings.");
    return;
  }

  console.log(
    "Creating chat room with:",
    user_id,
    userName,
    userToken,
    user_one_id,
    user_two_id
  );

  try {
    const user = {
      id: user_id,
      name: userName,
    };

    // Attempt to connect the user to the chat client with their token
    if (user_id && userToken) {
      await chatClient.connectUser(user, userToken);

      const channel = chatClient.channel(
        "messaging",
        `${user_one_id}_and_${user_two_id}_room`,
        {
          members: [user_one_id, user_two_id],
          name: `${userName} and ${user_two_id}'s room`,
        }
      );

      await channel.create();
      console.log("Chat room created successfully.");
    } else {
      console.error(
        "User ID or token is missing. Cannot connect to chat client."
      );
    }
  } catch (error) {
    console.error("Failed to create chat room:", error);
  }
}

export default createChatRoom;
