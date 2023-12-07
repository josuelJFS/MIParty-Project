import React, { useEffect } from "react";
import { Modal, IModalProps } from "native-base";

interface props extends IModalProps {
  isOpen: boolean;
  onClose: (e: boolean) => void;
  children: any;
}

function ModalApp({ isOpen, onClose, children, ...rest }: props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        flex={1}
        {...rest}
      >
        <Modal.Content>
          <Modal.CloseButton />
          {children}
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalApp;
