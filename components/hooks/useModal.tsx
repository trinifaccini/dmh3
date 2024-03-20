import { useState } from "react";

const useModal: () => [boolean, () => void, () => void] = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle: () => void = () => {
    setOpen((prev: boolean) => !prev);    
  };

  const openModal: () => void = () => {
    setOpen(true);    
  };

  return [open, handleToggle, openModal];
};

export default useModal;
