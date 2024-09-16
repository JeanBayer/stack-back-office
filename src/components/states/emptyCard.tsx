import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

type EmptyCardProps = {
  message: string;
  onRetry?: () => void;
  redirect?: {
    href: string;
    label: string;
  };
};

export const EmptyCard = ({ message, onRetry, redirect }: EmptyCardProps) => {
  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: true,
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              No se encontraron resultados
            </ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              {redirect && (
                <Link
                  href={redirect.href}
                  className="text-blue-500 hover:underline"
                >
                  {redirect.label}
                </Link>
              )}
              {onRetry && (
                <Button
                  color="warning"
                  onPress={() => {
                    onRetry();
                    onClose();
                  }}
                >
                  Retry
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
