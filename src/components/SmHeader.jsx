import {
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAccount } from "../context/AppContext";
import MyChatDrawer from "../chakraComponents/MyChatDrawer";
import { handleLogout } from "../services/functions";

const SmHeader = () => {
  const { setOpenProfile, setOpenSearch, setOpenMyChatDrawer, auth , setSelectedPerson } =
    useAccount();

  return (
    <>
      <HStack
        h={"20"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={{ base: "3", sm: "5" }}
        w={"full"}
        color={"whitesmoke"}
        gap={5}
        display={{ base: "flex", lg: "none" }}
      >
        <Image
          src={auth ? auth.pic : ""}
          alt="My-Profile-DP"
          w={"14"}
          h={"14"}
          borderRadius={"full"}
          onClick={() => {
            setSelectedPerson(data.chat);
          }}
        />
        <Input type="search" placeholder="Search User..." maxW={"96"} />
        <Menu>
          <MenuButton as={"button"}>
            <GiHamburgerMenu size={32} />
          </MenuButton>
          <MenuList color={"black"}>
            <MenuItem
              onClick={() => {
                setOpenProfile(true);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenSearch(true);
              }}
            >
              Search User
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMyChatDrawer(true);
              }}
            >
              My Chats
            </MenuItem>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <MyChatDrawer />
    </>
  );
};

export default SmHeader;
