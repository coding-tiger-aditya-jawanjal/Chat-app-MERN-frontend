import { Grid, HStack, Image, Text } from "@chakra-ui/react";
import { useAccount } from "../context/AppContext";
import { startSingleChat } from "../services/api";

export const SearchChatCards = (data) => {
  const { setSelectedPerson, setCurrentChat } = useAccount();

  const handleStartSingleChat = async (userId) => {
    try {
      const info = {
        users: [userId],
      };
      const res = await startSingleChat(info);
      if (!res.chat) {
        alert(res.msg);
      }
      setCurrentChat(res.chat);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <HStack
        h={"20"}
        py={"2"}
        px={"2"}
        alignItems={"center"}
        _hover={{
          cursor: "pointer",
          bgColor: "whatsapp.100",
          color: "black",
          borderRadius: "3xl",
        }}
      >
        <Image
          src={data ? data.user.pic : ""}
          alt="My-Profile-DP"
          w={"10"}
          h={"10"}
          borderRadius={"full"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedPerson(data.user);
          }}
        />
        <Grid
          templateRows={"auto auto"}
          ml={"2"}
          onClick={() => {
            handleStartSingleChat(data.user._id);
          }}
        >
          <Text fontWeight={"bold"} fontSize={"md"}>
            {data ? data.user.name : ""}
          </Text>
          <Text fontSize={"sm"}>{data ? data.user?.email : ""}</Text>
        </Grid>
      </HStack>
    </>
  );
};

export const MyChatCards = (data) => {
  const { setSelectedPerson, setCurrentChat, auth } = useAccount();

  return (
    <>
      <HStack
        h={"20"}
        py={"2"}
        px={"2"}
        alignItems={"center"}
        _hover={{
          cursor: "pointer",
          bgColor: "whatsapp.100",
          color: "black",
          borderRadius: "3xl",
        }}
      >
        <Image
          src={
            auth
              ? data
                ? data.chat.users.length > 2
                  ? data.chat.groupIcon
                  : data.chat.users.length > 1
                  ? data.chat.users.filter((e) => e._id !== auth._id)[0].pic
                  : ""
                : ""
              : ""
          }
          alt="My-Profile-DP"
          w={"10"}
          h={"10"}
          borderRadius={"full"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedPerson(data.chat);
          }}
        />
        <Grid
          templateRows={"auto auto"}
          ml={"2"}
          onClick={() => {
            setCurrentChat(data.chat);
          }}
        >
          <Text fontWeight={"bold"} fontSize={"md"}>
            {auth
              ? data
                ? data.chat.users.length > 2
                  ? data.chat.chatName
                  : data.chat.users.length > 1
                  ? data.chat.users.filter((e) => e._id !== auth._id)[0].name
                  : ""
                : ""
              : ""}
          </Text>
          <Text fontSize={"xs"}>
            {auth
              ? data
                ? data.chat ? 
                data.chat.latestMessage ?
                data.chat.latestMessage.content ?
                   data.chat.latestMessage.content.startsWith('http') ? 'media' :data.chat.latestMessage.content
                   :''
                   :''
                  :''
                  : ""
                : ""
              }
          </Text>
        </Grid>
      </HStack>
    </>
  );
};

export const SearchChatCardsForAddGroupChat = (data) => {
  const { setGroupChatUsers, groupChatUsers } = useAccount();

  const addToGroup = (e) => {
    groupChatUsers
      ? groupChatUsers.find((user) => e._id === user._id)
        ? ""
        : setGroupChatUsers([...groupChatUsers, data.user])
      : "";
  };

  return (
    <>
      <HStack
        h={"20"}
        py={"2"}
        px={"2"}
        alignItems={"center"}
        _hover={{
          cursor: "pointer",
          bgColor: "whatsapp.100",
          color: "black",
          borderRadius: "3xl",
        }}
      >
        <Image
          src={data ? data.user.pic : ""}
          alt="My-Profile-DP"
          w={"10"}
          h={"10"}
          borderRadius={"full"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setSelectedPerson(data.user);
          }}
        />
        <Grid
          templateRows={"auto auto"}
          ml={"2"}
          onClick={() => {
            addToGroup(data.user);
          }}
        >
          <Text fontWeight={"bold"} fontSize={"md"}>
            {data ? data.user.name : ""}
          </Text>
          <Text fontSize={"sm"}>Katrina kaif</Text>
        </Grid>
      </HStack>
    </>
  );
};
