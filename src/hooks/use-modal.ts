import { useState } from "react";
import { ModalProps } from "../components";

export const useModal = () => {
  const CLOSED_MODAL_PROPS = {
    title: "",
    description: "",
    opened: false,
    onSubmit: () => {},
  };
  const [modalState, setModalState] = useState<ModalProps>(CLOSED_MODAL_PROPS);
  const closeModal = () => setModalState(CLOSED_MODAL_PROPS);
  const openModal = (props: ModalProps) => setModalState(props);
  return {
    /**Props to use in the modal */
    modalProps: modalState,
    closeModal,
    openModal,
  };
};
