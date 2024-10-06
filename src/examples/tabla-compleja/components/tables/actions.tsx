import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '@tabla-compleja/components';
import React from 'react';

type ActionsProps = {
  actions: {
    value: React.ReactNode;
    handleClick?: () => void;
    label: string;
  }[];
};

export const Actions = ({ actions = [] }: ActionsProps) => {
  return (
    <div className="relative flex justify-end items-center gap-2 text-slate-900">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <VerticalDotsIcon className="text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-slate-900">
          {actions?.map((action, i) => (
            <DropdownItem
              key={i}
              onClick={action?.handleClick}
              textValue={action.label}
            >
              {action.value}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
