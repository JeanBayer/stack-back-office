import { Button } from '@nextui-org/react';
import { ActionMode } from '@tabla-compleja/types';

type OutsideActionProps = {
  actionMode: ActionMode | null;
  isLoading: boolean;
  handleClick: () => void;
};
export const OutsideAction = ({
  actionMode,
  isLoading,
  handleClick,
}: OutsideActionProps) => {
  return (
    <div
      className="flex justify-end items-center w-full"
      style={{ paddingRight: '1.25rem' }}
    >
      {actionMode && (
        <Button
          variant="solid"
          color="primary"
          onClick={handleClick}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          {actionMode}
        </Button>
      )}
    </div>
  );
};
