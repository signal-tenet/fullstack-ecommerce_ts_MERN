import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

interface ConfirmRemovalAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  itemToDelete: { _id: string; name: string };
  deleteAction: (id: string) => any;
}

const ConfirmRemovalAlert: React.FC<ConfirmRemovalAlertProps> = ({
  isOpen,
  onClose,
  cancelRef,
  itemToDelete,
  deleteAction,
}) => {
  const dispatch = useDispatch();

  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete {itemToDelete.name}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onDeleteItem} ml={3}>
              Delete {itemToDelete.name}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmRemovalAlert;
