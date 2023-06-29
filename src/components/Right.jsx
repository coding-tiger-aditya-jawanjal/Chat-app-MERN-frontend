import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import { useAccount } from "../context/AppContext";
import { BACKEND_URL, getSingleChat, sendMediaMessage, sendMessage } from "../services/api";
import socketIO from "socket.io-client";
import { saveAs } from "file-saver";

const endpoint = `${BACKEND_URL}`;

var socket;
var newArr;

const Right = () => {
  const {
    setSelectedPerson,
    currentChat,
    auth,
    allOnlineUsers,
    messages,
    setMessages,
  } = useAccount();

  const fileRef = useRef();
  const msgBox = useRef();
  const [text, setText] = useState('');
  const [file, setFile] = useState();

  useEffect(() => {
    socket = socketIO(endpoint, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Socket Connected.");
    });

    socket.emit("join_room", { room: currentChat._id });

  }, [socket]);

  useEffect(() => {
    msgBox.current.scrollTo("0", msgBox.current.scrollHeight);
  });

  const handleFileChange = () => {
    fileRef.current.click();
    if (file) {
      const data = {
        chatId: currentChat._id,
        file: file,
      };
      handleSendMediaMessage(data);
    }
  };

  const handleGetSingleChat = async () => {
    try {
        const res = await getSingleChat(currentChat._id);
        console.log(res.chats[0].messages);
        if(res?.chats[0].messages){
          setMessages(res.chats[0].messages);
        }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async (e) => {
    try {
      const data = {
        content: e.text,
        chatId: e.chatId,
      };
      const res = await sendMessage(data);
      if(res){
        socket.emit("msg", { msg: res, room: currentChat._id });
        await handleGetSingleChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    socket.on("new_msg", ({msg}) => {
     const my = [...messages , msg];
      setMessages(my);
    });
  })

  const handleSendMediaMessage = async (e) => {
    try {
      const data = new FormData();
      data.append("chatId", e.chatId);
      data.append("file", e.file);
      const res = await sendMediaMessage(data);
      if(res){
        socket.emit("msg", { msg: res, room: currentChat._id });
        await handleGetSingleChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentChat) {
      handleGetSingleChat();
    }
  }, [currentChat]);

  return (
    <>
      <Stack
        my={"10"}
        p={"3"}
        border={"2px solid red"}
        borderRadius={"3xl"}
        color={"whitesmoke"}
        w={{
          sm: "80",
          mid: "container.sm",
          "2xl": "container.xl",
        }}
      >
        <HStack
          h={"24"}
          alignItems={"center"}
          borderBottom={"2px solid orange"}
        >
          <Image
            src={
              currentChat
                ? currentChat.isGroupChat
                  ? currentChat.groupIcon
                  : currentChat.users?.filter((e) => e._id !== auth._id)[0].pic
                : ""
            }
            alt="My-Profile-DP"
            w={"20"}
            h={"20"}
            borderRadius={"full"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedPerson(currentChat);
            }}
          />
          <Grid templateRows={"auto auto"} ml={"5"}>
            <Text fontWeight={"bold"} fontSize={{ base: "lg", md: "3xl" }}>
              {currentChat
                ? currentChat.isGroupChat
                  ? currentChat.chatName
                  : currentChat.users?.filter((e) => e._id !== auth._id)[0].name
                : ""}
            </Text>
          </Grid>
        </HStack>
        <Stack
          ref={msgBox}
          py={"5"}
          h={"96"}
          mb={"10"}
          overflowY={"auto"}
          __css={{
            "&::-webkit-scrollbar": {
              w: "1",
            },
            "&::-webkit-scrollbar-track": {
              w: "3",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10",
              bg: `linkedin.500`,
            },
          }}
        >
          {messages?.map((e) => {
            return (
              <Box
                key={e._id}
                pos={"relative"}
                maxW={"80"}
                mb={"3"}
                mr={"2"}
                border={"1px solid blue"}
                borderRadius={"3xl"}
                px={"3"}
                py={"2"}
                wordBreak={"break-word"}
                h={"auto"}
                alignSelf={
                  auth
                    ? e
                      ? e.senderId
                        ? e.senderId._id !==  auth._id
                          ? "flex-start"
                          : "end"
                        : "end"
                      : "end"
                    : "end"
                }
                color={"linkedin.100"}
                fontSize={"1.1rem"}
              >
                {auth ? (
                  e ? (
                    e.senderId ? (
                      auth._id === e.senderId._id ? (
                        ""
                      ) : (
                        <Text
                          pos={"absolute"}
                          top={"-5"}
                          fontSize={"xs"}
                          mb={"10"}
                          color={'whitesmoke'}
                        >
                          {e.senderId
                            ? e.senderId.name
                              ? e.senderId.name.split(" ")[0]
                              : ""
                            : ""}
                        </Text>
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {e ? (
                  e.content?.startsWith("https") ? (
                    <HStack
                      h={"14"}
                      w={"28"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      color={"green.400"}
                    >
                      <Box
                        bgColor={"whitesmoke"}
                        borderRadius={"full"}
                        p={"4"}
                        cursor={"pointer"}
                        onClick={() => saveAs(e.content)}
                      >
                        <GrDownload size={16} />
                      </Box>
                      <Text fontSize={"lg"}>
                        {e.content ? `.${e.content.split(".").pop()}` : ""}
                      </Text>
                    </HStack>
                  ) : (
                    e.content
                  )
                ) : (
                  ""
                )}
              </Box>
            );
          })}
        </Stack>
        <HStack h={"14"} gap={5} color={"whitesmoke"} px={"3"}>
          <Box _hover={{ cursor: "pointer" }}>
            <ImAttachment size={28} onClick={handleFileChange} />
          </Box>
          <Input
            type="text"
            placeholder="Message..."
            w={"70%"}
            h={"full"}
            onChange={(e) => setText(e.target.value)}
            value={text ? text : ""}
          />
          <Input
            type="file"
            ref={fileRef}
            display={"none"}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            bgColor={"linkedin.300"}
            color={"black"}
            size={"lg"}
            w={{ sm: "20", mid: "40" }}
            h={"full"}
            display={{ base: "none", sm: "flex" }}
            onClick={() => {
              setText();
              handleSendMessage({ text: text, chatId: currentChat._id });
            }}
          >
            Send
          </Button>
          <Box
            display={{ base: "flex", sm: "none" }}
            as="button"
            onClick={() => {
              setText();
              handleSendMessage({ text: text, chatId: currentChat._id });
            }}
          >
            <IoSend size={28} />
          </Box>
        </HStack>
      </Stack>
    </>
  );
};

export default Right;
