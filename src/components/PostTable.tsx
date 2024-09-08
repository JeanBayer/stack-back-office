import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { Actions } from './Actions';
import { Paginator } from './Paginator';

type PostTable = {
  data: Post[];
  paginator: {
    changePage: (page: number) => void;
    page: number;
    maxPages: number;
  };
};

export const PostTable = ({ data, paginator }: PostTable) => {
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
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell width={30}>
              <Actions
                actions={[
                  {
                    value: (
                      <Link
                        to={`/posts/${post.id}`}
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
                        to={`/posts/${post.id}/edit`}
                        className="flex items-center"
                      >
                        Edit
                      </Link>
                    ),
                    label: 'Edit',
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
