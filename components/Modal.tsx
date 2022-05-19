import React, { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';

type Props = {
  children: React.ReactNode;
};

export const ModalContext = React.createContext({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

function Modal({ children }: Props) {
  const { open, closeModal } = useContext(ModalContext);
  return (
    <>
      {open && (
        <div className="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 p-10">
          <div className="absolute bg-white opacity-40 w-full h-full" />
          <div className="relative rounded-md bg-white shadow p-3 min-h-[100px] z-10 max-w-[600px] min-w-[300px] w-full">
            <button
              type="button"
              className="absolute top-2 right-2 p-2"
              onClick={() => closeModal()}
            >
              <FiX className="text-2xl text-gray-400" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export const ModalProvider = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        openModal: () => {
          document.body.classList.add('overflow-hidden');
          setOpen(true);
        },
        closeModal: () => {
          document.body.classList.remove('overflow-hidden');
          setOpen(false);
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default Modal;
