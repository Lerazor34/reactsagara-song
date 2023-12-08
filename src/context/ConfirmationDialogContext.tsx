import { useConfirmationDialog } from "../hooks/useConfirmationDialog";
import { createContext, FC, useContext, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ConfirmationDialogContextProps {
  showConfirmation: (
    title: string,
    message: string
  ) => Promise<boolean>;
}

interface ConfirmationDialogContextProviderProps {
  children: React.ReactNode
}

interface showConfirmationProps {
  title: string;
  message: string
}

const ConfirmationDialogContext = createContext<ConfirmationDialogContextProps>(
  {} as ConfirmationDialogContextProps
)

const ConfirmationDialogContextProvider: FC<ConfirmationDialogContextProviderProps> = ({children}) => {
  const {setShow, show, onHide} = useConfirmationDialog();
  const [content, setContent] = useState<showConfirmationProps>(
    {} as showConfirmationProps
  );
  const resolver = useRef<Function>();

  const handleShow = (title: string, message: string): Promise<boolean> => {
    setContent({
      title,
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve
    })
  }

  const modalContext: ConfirmationDialogContextProps = {
    showConfirmation: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationDialogContext.Provider value={modalContext}>
      {children}

      {content && (
        <Modal centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content.message}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </ConfirmationDialogContext.Provider>
  )
}

const useConfirmationDialogContext = (): ConfirmationDialogContextProps =>
  useContext(ConfirmationDialogContext);

export { useConfirmationDialogContext, ConfirmationDialogContextProvider };
