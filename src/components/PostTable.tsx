import { Link } from 'react-router-dom';
import { Table } from './Table';

export const PostTable = () => {
  const data = [
    {
      id: '1',
      title: 'Post Title 1',
      views: 120,
      author: 'Alice',
      date: '2024-01-01',
    },
    {
      id: '2',
      title: 'Post Title 2',
      views: 220,
      author: 'Juan',
      date: '2024-02-02',
    },
  ];

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
        {data.map((row) => (
          <Table.TR key={row.id}>
            <Table.TD>{row.id}</Table.TD>
            <Table.TD>{row.title}</Table.TD>
            <Table.TD>{row.views}</Table.TD>
            <Table.TD>{row.author}</Table.TD>
            <Table.TD>
              <Link to={`/posts/${row.id}/edit`}>Edit</Link>
            </Table.TD>
          </Table.TR>
        ))}
      </Table.TBody>
    </Table>
  );
};
