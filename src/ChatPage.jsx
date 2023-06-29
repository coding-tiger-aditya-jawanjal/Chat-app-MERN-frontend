import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import Left from "./components/Left";
import Right from "./components/Right";
import SmHeader from "./components/SmHeader";
import { getAllMyChats, getAllUsers } from "./services/api";
import { useAccount } from "./context/AppContext";

const chatPage = () => {
  const { setAllUsers , setAllMyChats, currentChat , auth} = useAccount();

  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUsers();
      if (!res.users) {
        console.log(res.msg);
      }
      setAllUsers(res.users);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetAllMyChats = async () => {
    try {
      const res = await getAllMyChats();
      if (!res.chats) {
        console.log(res.msg);
      }
      setAllMyChats(res.chats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    handleGetAllMyChats();
  }, [currentChat]);

  return (
    <>
      <SmHeader />
      <Grid
        p={"3"}
        templateColumns={{ sm: "auto", lg: "auto auto" }}
        gap={{ sm: 1, lg: 5 }}
        w={"95vw"}
        justifyContent={"center"}
      >
        <Left />
        {
          currentChat  ?  <Right /> :''
        }
      </Grid>
    </>
  );
};

export default chatPage;
