import { FieldSkeleton } from '@/components';
import { Card, CardBody, Spacer, CardHeader } from '@nextui-org/react';

export const FormSkeleton = () => {
  return (

    <div className="m-0 mx-auto w-fit p-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index} style={{ width: 345, marginBottom: '1rem' }}>
          <CardHeader>
            <FieldSkeleton.Line />
          </CardHeader>
          <CardBody>
            <FieldSkeleton.Input />
            <Spacer y={1} />
            <FieldSkeleton.Input />
          </CardBody>
        </Card>
      ))}
      <Spacer y={1} />
      <FieldSkeleton.Button />
    </div>
  );
};
