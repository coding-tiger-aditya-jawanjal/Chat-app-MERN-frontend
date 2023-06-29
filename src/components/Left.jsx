import React from "react";
import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileModal from "../chakraComponents/ProfileModal";
import { useAccount } from "../context/AppContext";
import SearchUserDrawer from "../chakraComponents/SearchUserDrawer";
import { handleLogout } from "../services/functions";
import { MyChatCards } from "./ChatCards";
import PersonModal from "../chakraComponents/PersonModal";
import AddGroupDrawer from "../chakraComponents/AddGroupDrawer";

const Left = () => {
  const { setOpenProfile, auth, setOpenSearch, allMyChats ,setOpenAddGroup} = useAccount();
  return (
    <>
      <Stack
        color={"whitesmoke"}
        gap={4}
        border={"2px solid red"}
        borderRadius={"3xl"}
        p={"5"}
        my={"10"}
        display={{ base: "none", lg: "flex" }}
        w={{ lg: "96" }}
      >
        <HStack
          h={"20"}
          justifyContent={"space-between"}
          alignItems={"center"}
          borderBottom={"2px solid blue"}
          pb={"2"}
        >
          <Image
            src={auth ? auth.pic : ""}
            alt="My-Profile-DP"
            w={"14"}
            h={"14"}
            borderRadius={"full"}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setOpenProfile(true);
            }}
          />
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
              <MenuItem onClick={()=>{setOpenAddGroup(true);}}>Create Group</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Stack
          h={"lg"}
          overflowY={"auto"}
          __css={{
            "&::-webkit-scrollbar": {
              w: "2",
            },
            "&::-webkit-scrollbar-track": {
              w: "6",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10",
              bg: `linkedin.500`,
            },
          }}
        >
          {allMyChats
            ? allMyChats.map((e) => {
                return <MyChatCards key={e._id} chat={e} />;
              })
            : "Start a New Chat !"}
        </Stack>
      </Stack>
      <ProfileModal />
      <SearchUserDrawer />
      <PersonModal />
      <AddGroupDrawer/>
    </>
  );
};

export default Left;
