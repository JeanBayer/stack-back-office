import { Button } from '@nextui-org/react';
import { ActionMode } from '@tabla-compleja/types';

type OutsideActionProps = {
  actionMode: ActionMode | null;
  handleClick: () => void;
};
export const OutsideAction = ({
  actionMode,
  handleClick,
}: OutsideActionProps) => {
  return (
    <div
      className="flex justify-end items-center w-full"
      style={{ paddingRight: '1.25rem' }}
    >
      {actionMode && (
        <Button variant="solid" color="primary" onClick={handleClick}>
          {actionMode}
        </Button>
      )}
    </div>
  );
};
