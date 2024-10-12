import { Button } from '@nextui-org/react';
import { type ActionMode } from '@tabla-compleja/types';

type OutsideActionProps = {
  actionsMode: ActionMode[];
  isLoading: boolean;
  handleClick: (action: ActionMode) => void;
};
export const OutsideAction = ({
  actionsMode,
  isLoading,
  handleClick,
}: OutsideActionProps) => {
  return (
    <div
      className="flex justify-end items-center w-full gap-4"
      style={{ paddingRight: '1.25rem' }}
    >
      {actionsMode.map((action) => (
        <Button
          key={action}
          variant="solid"
          color="primary"
          onClick={() => handleClick(action)}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          {action}
        </Button>
      ))}
    </div>
  );
};
