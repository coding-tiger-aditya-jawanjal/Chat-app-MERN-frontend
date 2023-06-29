import React, { useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import { useAccount } from "../context/AppContext";
import { MyChatCards } from "../components/ChatCards";

const MyChatDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { allMyChats, openMyChatDrawer, setOpenMyChatDrawer } = useAccount();

  useEffect(() => {
    if (openMyChatDrawer) {
      btnRef.current.click();
    }
  }, [openMyChatDrawer]);

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
          setOpenMyChatDrawer(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setOpenMyChatDrawer(false);
              onClose();
            }}
          />
          <DrawerHeader>My Chats : </DrawerHeader>
          <DrawerBody>
            <Input placeholder="Search User..." mb={"10"} autoFocus={true} />
            <Stack h={"lg"} onClick={() => {
                onClose();
                setOpenMyChatDrawer(false);
              }} >
              {allMyChats
                ? allMyChats.map((e) => {
                    return <MyChatCards key={e._id} chat={e} />;
                  })
                : "Start a New Chat !"}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setOpenMyChatDrawer(false);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setOpenMyChatDrawer(false);
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

export default MyChatDrawer;
