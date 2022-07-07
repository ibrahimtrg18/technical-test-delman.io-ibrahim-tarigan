import React, { FC } from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

interface ModalProps {
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { title, body, footer, isOpen, onClose } = props;

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
