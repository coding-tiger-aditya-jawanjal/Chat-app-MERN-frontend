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
import { SearchChatCards } from "../components/ChatCards";

const SearchUserDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { openSearch, setOpenSearch, allUsers, auth } = useAccount();

  useEffect(() => {
    if (openSearch) {
      btnRef.current.click();
    }
  }, [openSearch]);

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
          setOpenSearch(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setOpenSearch(false);
              onClose();
            }}
          />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <Input placeholder="Search User..." mb={"10"} autoFocus={true} />
            <Stack
              onClick={() => {
                onClose();
                setOpenSearch(false);
              }}
            >
              {allUsers
                ? allUsers.map((e) => {
                    return auth ? (
                      auth._id !== e._id && (
                        <SearchChatCards key={e._id} user={e} />
                      )
                    ) : (
                      <SearchChatCards key={e._id} user={e} />
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
                setOpenSearch(false);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setOpenSearch(false);
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

export default SearchUserDrawer;
