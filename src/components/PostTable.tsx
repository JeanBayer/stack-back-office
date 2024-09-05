import { Link } from 'react-router-dom';
import { Post } from '../types/post';
import { Paginator } from './Paginator';
import { Table } from './Table';

type PostTable = {
  data: Post[];
};

export const PostTable = ({ data }: PostTable) => {
  return (
    <Table>
      <Table.THead>
        <Table.TR>
          <Table.TH>Id</Table.TH>
          <Table.TH>Title</Table.TH>
          <Table.TH>Views</Table.TH>
          <Table.TH>
            Author <em>hola</em>
          </Table.TH>
          <Table.TH>Action</Table.TH>
        </Table.TR>
      </Table.THead>
      <Table.TBody>
        {data?.map((row) => (
          <Table.TR key={row.id}>
            <Table.TD>{row.id}</Table.TD>
            <Table.TD>{row.title}</Table.TD>
            <Table.TD>{row.views}</Table.TD>
            <Table.TD>{row.author}</Table.TD>
            <Table.TD>
              <Link to={`/posts/${row.id}/edit`}>Edit</Link>
              <br />
              <Link to={`/posts/${row.id}`}>show</Link>
            </Table.TD>
          </Table.TR>
        ))}
      </Table.TBody>
      <Table.TFoot>
        <Table.TR>
          <Table.TD colSpan={5}>
            <Paginator />
          </Table.TD>
        </Table.TR>
      </Table.TFoot>
    </Table>
  );
};
