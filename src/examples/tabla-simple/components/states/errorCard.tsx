import { Button, Card, CardBody } from '@nextui-org/react';

type ErrorCardProps = {
  errorMessage: string;
  onRetry: () => void;
};

export const ErrorCard = ({ errorMessage, onRetry }: ErrorCardProps) => {
  return (
    <Card>
      <CardBody
        className="flex flex-col items-center justify-center gap-4"
        style={{ height: '200px' }}
      >
        <h2>{errorMessage}</h2>
        <Button onClick={onRetry} color="danger">
          Reintentar
        </Button>
      </CardBody>
    </Card>
  );
};
