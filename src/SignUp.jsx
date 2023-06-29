import React, { useState } from "react";
import {
  Button,
  HStack,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
// import { handleLogin, handleSignUp } from "./services/functions";
import { useAccount } from "./context/AppContext";
import { loginapi, signup } from "./services/api";

const SignUp = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();

  const { setLoading, loading } = useAccount();

  const handleSignUp = async (e) => {
    let data;
    try {
      if (e.pic) {
        data = new FormData();
        data.append("name", e.name);
        data.append("email", e.email);
        data.append("password", e.password);
        data.append("pic", e.pic);
      } else {
        data = {
          name: e.name,
          email: e.email,
          password: e.password,
        };
      }
      const res = await signup(data);
      if (!res.token) {
        setLoading(false);
        alert(res.msg);
      }
      if(res.token){
        setLoading(false);
      localStorage.setItem("chatUser", JSON.stringify(res.token.token));
      alert(res.msg);
      window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    try {
      const data = {
        email: e.email,
        password: e.password,
      };
      const res = await loginapi(data);
      if (!res.token) {
        setLoading(false);
        alert(res.msg);
      }
      setLoading(false);
      localStorage.setItem("chatUser", JSON.stringify(res.token.token));
      alert(res.msg);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HStack
        w={"full"}
        justifyContent={{ base: "center", lg: "space-between" }}
        flexWrap={"wrap-reverse"}
        p={"20"}
        color={"whitesmoke"}
        gap={10}
      >
        <Stack w={"96"} gap={5}>
          <Text alignSelf={"center"} fontSize={"4xl"} mb={"10"}>
            {login ? "Login" : "Sign Up"}
          </Text>
          <Input
            type="text"
            placeholder="Enter your Name..."
            h={"14"}
            display={login ? "none" : ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Enter your Email..."
            h={"14"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your Password..."
            h={"14"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="file"
            p={"3"}
            h={"14"}
            display={login ? "none" : ""}
            border={"none"}
            onChange={(e) => setPic(e.target.files[0])}
          />
          <Button
            bgColor={"orange.300"}
            h={"14"}
            onClick={
              login
                ? () => {
                    handleLogin({ email, password });
                    setLoading(true);
                  }
                : () => {
                    handleSignUp({ name, email, password, pic });
                    setLoading(true);
                  }
            }
          >
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
                w={"10"}
                h={"10"}
                alignSelf={"center"}
              />
            ) : login ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>
          <Stack
            flexDir={{ base: "column", mid: "row" }}
            placeItems={"center"}
            justifyContent={"center"}
            display={loading ? "none" : "flex"}
          >
            <Text alignSelf={"center"}>
              {login ? "Don`t have an account ? " : "Already have an account ?"}{" "}
            </Text>
            <Text
              fontSize={"lg"}
              color={"red.400"}
              pb={"1"}
              borderBottom={"blue"}
              ml={"3"}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setLogin(!login);
              }}
            >
              {login ? "Sign Up" : "Login"}
            </Text>
          </Stack>
        </Stack>
        <Stack alignSelf={"self-start"}>
          <Heading>Welocome to the Chat World !</Heading>
          <Heading>The " Chat-King Web"</Heading>
        </Stack>
      </HStack>
    </>
  );
};

export default SignUp;
