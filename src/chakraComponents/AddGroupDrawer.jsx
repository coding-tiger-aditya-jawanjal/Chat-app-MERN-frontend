import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Stack,
  Tag,
  HStack,
} from "@chakra-ui/react";
import { useAccount } from "../context/AppContext";
import {
  SearchChatCards,
  SearchChatCardsForAddGroupChat,
} from "../components/ChatCards";
import { handleNewGroup } from "../services/functions";

const AddGroupDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    openAddGroup,
    setOpenAddGroup,
    allUsers,
    auth,
    setGroupChatUsers,
    groupChatUsers,
  } = useAccount();

  const [chatName , setChatName] = useState();

  useEffect(() => {
    if (openAddGroup) {
      btnRef.current.click();
    }
  }, [openAddGroup]);

  const removeUser = (e) =>{
    const users = groupChatUsers.filter(u=>u._id !== e._id);
    setGroupChatUsers(users);
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} display={"none"}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        finalFocusRef={btnRef}
        onClose={() => {
          onClose();
          setOpenAddGroup(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setOpenAddGroup(false);
              onClose();
            }}
          />
          <DrawerHeader>Add New Group</DrawerHeader>
          <DrawerBody>
            <Input placeholder="Chat Name..." mb={"4"} onChange={(e)=>setChatName(e.target.value)} />
            <Stack pb={"4"} borderBottom={"2px solid black"} my={"4"} gap={3}>
              {groupChatUsers
                ? groupChatUsers.map((e) => {
                    return (
                      <HStack key={e._id} gap={2} >
                        <Tag
                        size={"lg"}
                        h={"14"}
                        fontSize={'xs'}
                        w={"28"}
                        variant="solid"
                        colorScheme="teal"
                      >
                        {e.name}
                      </Tag>
                      <Button w={'3'} h={'10'} borderRadius={'full'} bgColor={'red.500'} onClick={()=>removeUser(e)} > X </Button>
                      </HStack>
                    );
                  })
                : ""}
            </Stack>
            
            <Button bgColor={"linkedin.200"} h={"14"} w={"full"} onClick={()=>handleNewGroup({users:groupChatUsers , name:chatName})}  >
              Create Group
            </Button>
            <Input placeholder="Search User..." mb={"10"} autoFocus={true} />
            <Stack
              mt={"4"}
            >
              {allUsers
                ? allUsers.map((e) => {
                    return auth ? (
                      auth._id !== e._id && (
                        <SearchChatCardsForAddGroupChat key={e._id} user={e} />
                      )
                    ) : (
                      <SearchChatCardsForAddGroupChat key={e._id} user={e} />
                    );
                  })
                : "No User Found"}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setOpenAddGroup(false);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setOpenAddGroup(false);
                onClose();
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddGroupDrawer;
