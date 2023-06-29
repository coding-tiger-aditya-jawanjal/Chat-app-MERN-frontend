import React, { useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAccount } from "../context/AppContext";

const ProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { openProfile, setOpenProfile, auth } = useAccount();

  useEffect(() => {
    if (openProfile) {
      btnRef.current.click();
    }
  }, [openProfile]);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} display={"none"}>
        Open Modal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setOpenProfile(false);
        }}
        size={{ base: "xs", sm: "sm", mid: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile :- </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={5} alignItems={"center"}>
              <Image
                src={auth ? auth.pic : ""}
                alt="My-Profile-DP"
                w={"60"}
                h={"60"}
                borderRadius={"full"}
              />
              <Heading>{auth ? auth.name : ""}</Heading>
              <Text fontSize={"2xl"}>{auth ? auth.email : ""}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setOpenProfile(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
