import {
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
  StreamChat,
  User,
} from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
} from "stream-chat-react";
import { useRouter } from "next/router";
import "stream-chat-react/dist/css/v2/index.css";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user_id = session?.user?.id || "";
  const userName = session?.user?.name || "";
  const userToken = session?.user?.token || "";

  // Redirect if not authenticated
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const user: User = {
    id: user_id,
    name: userName,
    token: userToken,
  };

  const apiKey = "w3pgxt7fwrmm";
  const chatClient = new StreamChat(apiKey);

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: "messaging",
    members: { $in: [user_id] },
  };
  const options: ChannelOptions = {
    limit: 10,
  };

  if (user_id) {
    chatClient.connectUser(user, userToken);
  }

  return (
    <Chat client={chatClient} theme="str-chat__theme-light">
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
