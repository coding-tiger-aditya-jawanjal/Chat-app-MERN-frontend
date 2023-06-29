import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ChatPage from "./ChatPage";
import SignUp from "./SignUp";
import { useAccount } from "./context/AppContext";
import { myInfo } from "./services/api";

const App = () => {
  const token = localStorage.getItem("chatUser");
  const { setAuth, setLoading } = useAccount();

  const handleAuth = async () => {
    try {
      const res = await myInfo();
      if (!res.me) {
        console.log(res.msg);
      }
      setLoading(false);
      setAuth(res.me);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      handleAuth();
    }
  }, []);

  return (
    <>
      <Box minH={"100vh"} bgColor={"back"}>
        {token ? <ChatPage /> : <SignUp />}
      </Box>
    </>
  );
};

export default App;
