import { useState } from "react";
import { ModalProps } from "../components";

type OpenModalProps = {
  title: string;
  description?: string;
  icons?: "OK" | "Ignore" | "OkIgnore" | "None";
  onSubmit?: (response: "Ok" | "Ignore") => void;
};

export const useModal = () => {
  const CLOSED_MODAL_PROPS = {
    title: "",
    description: "",
    opened: false,
    onSubmit: () => {},
  };

  const [modalState, setModalState] = useState<ModalProps>(CLOSED_MODAL_PROPS);
  const closeModal = () => setModalState(CLOSED_MODAL_PROPS);
  const openModal = (props: OpenModalProps) =>
    setModalState({
      ...props,
      onSubmit: props.onSubmit ?? closeModal,
      opened: true,
    });
  return {
    /**Props to use in the modal */
    modalProps: modalState,
    closeModal,
    openModal,
  };
};
