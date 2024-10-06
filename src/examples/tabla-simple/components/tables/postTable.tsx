import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { ActionsCRUD, Paginator } from '@tabla-simple/components';
import type { Post } from '@tabla-simple/types';
import { Constants } from '@tabla-simple/utils';

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

export const PostTable = ({
  data,
  paginator,
  emptyContent,
  onDelete,
}: PostTable) => {
  return (
    <Table
      aria-label="Example static collection table"
      className="text-slate-900"
      selectionMode="single"
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
