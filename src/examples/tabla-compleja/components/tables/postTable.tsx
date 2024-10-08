import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import {
  ActionsCRUD,
  OutsideAction,
  Paginator,
} from '@tabla-compleja/components';
import { useMultipleSelectedItem } from '@tabla-compleja/hooks';
import type { ActionSelection, Post } from '@tabla-compleja/types';
import { Constants } from '@tabla-compleja/utils';

type PostTable = {
  data: Post[];
  paginator: {
    changePage: (page: number) => void;
    page: number;
    maxPages: number;
  };
  emptyContent?: React.ReactNode;
  onDelete: (id: string) => void;
};

const actionSelection: ActionSelection[] = [
  {
    estado: 'disponible',
    actionMode: 'publicar',
  },
  {
    estado: 'archivado',
    actionMode: 'desarchivar',
  },
];

export const PostTable = ({
  data,
  paginator,
  emptyContent,
  onDelete,
}: PostTable) => {
  const { selectedKeys, disabledKeys, actionMode, handleSelectionChange } =
    useMultipleSelectedItem({
      data,
      actionSelection,
    });

  return (
    <Table
      aria-label="Example static collection table"
      className="text-slate-900"
      selectionMode="multiple"
      disabledKeys={disabledKeys}
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      topContentPlacement="outside"
      topContent={
        <OutsideAction
          actionMode={actionMode}
          handleClick={() => console.log('Action')}
        />
      }
      bottomContent={
        <Paginator
          changePage={paginator.changePage}
          page={paginator.page}
          maxPages={paginator.maxPages}
        />
      }
    >
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn>VIEWS</TableColumn>
        <TableColumn>STATE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={emptyContent}>
        {data?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell>{post.estado}</TableCell>
            <TableCell width={30}>
              <ActionsCRUD
                viewItemRoute={Constants.ROUTES.POSTS_FORM}
                editItemRoute={Constants.ROUTES.POSTS_FORM_EDIT}
                onDeleteItem={onDelete}
                idItem={post.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
