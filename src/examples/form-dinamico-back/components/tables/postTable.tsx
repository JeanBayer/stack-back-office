import { Actions } from '@tabla-simple/components';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Link } from 'react-router-dom';
import { PostData } from '@/types';

type PostTableProps = {
  data: PostData[];
  emptyContent?: React.ReactNode;
  onDelete: (id: string) => void;
};

export const PostTable = ({
  data,
  emptyContent,
  onDelete,
}: PostTableProps) => {

  return (
    <Table
      aria-label="Example static collection table"
      className="text-slate-900"
      selectionMode="single"
    >
      <TableHeader>
        <TableColumn>Modulo Audiencia</TableColumn>
        <TableColumn>Modulo MisionDynamic</TableColumn>
        <TableColumn>Modulo Icono</TableColumn>
        <TableColumn>Modulo Mision</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={emptyContent}>
        {data?.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post['modulo-mision-instruccion']}</TableCell>
            <TableCell>{post['modulo-mision-dynamic']}</TableCell>
            <TableCell>{post['modulo-icono']}</TableCell>
            <TableCell>{post['modulo-mision']}</TableCell>
            <TableCell width={30}>
              <Actions
                actions={[
                  {
                    value: (
                      <Link
                        to={`/form-dinamico-back/${post.id}`}
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
                        to={`/form-dinamico-back/${post.id}/edit`}
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
                    handleClick: () => onDelete(post.id),
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
