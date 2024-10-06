import { Actions } from '@/components';
import { Link } from 'react-router-dom';

type ActionsSimpleProps = {
  viewItemRoute: string;
  editItemRoute: string;
  onDeleteItem: (id: string) => void;
  idItem: string;
};

export const ActionsCRUD= ({
  viewItemRoute,
  editItemRoute,
  onDeleteItem,
  idItem,
}: ActionsSimpleProps) => {
  return (
    <Actions
      actions={[
        {
          value: (
            <Link
              to={viewItemRoute.replace(':id', idItem)}
              className="flex items-center"
            >
              View
            </Link>
          ),
          label: 'View',
        },
        {
          value: (
            <Link
              to={editItemRoute.replace(':id', idItem)}
              className="flex items-center"
            >
              Edit
            </Link>
          ),
          label: 'Edit',
        },
        {
          value: 'Delete',
          label: 'Delete',
          handleClick: () => onDeleteItem(idItem),
        },
      ]}
    />
  );
};
