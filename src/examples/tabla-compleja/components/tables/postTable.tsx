import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { ActionsCRUD, Paginator } from '@tabla-compleja/components';
import type { Post } from '@tabla-compleja/types';
import { Constants } from '@tabla-compleja/utils';
import { useEffect, useState } from 'react';

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
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [disabledKeys, setDisabledKeys] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<Post[]>([]);
  const [actionMode, setActionMode] = useState<string | null>(null);

  useEffect(() => {
    const selectedData = data?.filter((post) => selectedKeys?.has(post.id));

    if (selectedData.length === 0) {
      setDisabledKeys([]);
      setActionMode(null);
    } else if (selectedData.every((post) => post.estado === 'disponible')) {
      const disabledData = data?.filter((post) => post.estado !== 'disponible');
      setDisabledKeys(disabledData.map((post) => post.id));
      setActionMode('publicar');
    } else if (selectedData.every((post) => post.estado === 'pausado')) {
      const disabledData = data?.filter((post) => post.estado !== 'pausado');
      setDisabledKeys(disabledData.map((post) => post.id));
      setActionMode('disponibilizar');
    } else if (selectedData.every((post) => post.estado === 'archivado')) {
      const disabledData = data?.filter((post) => post.estado !== 'archivado');
      setDisabledKeys(disabledData.map((post) => post.id));
      setActionMode('desarchivar');
    } else {
      setSelectedKeys(new Set([]));
      setDisabledKeys([]);
      setActionMode(null);
    }

    setSelectedData(selectedData);
  }, [selectedKeys, data]);

  console.log(selectedData);
  console.log(actionMode);

  return (
    <Table
      aria-label="Example static collection table"
      className="text-slate-900"
      selectionMode="multiple"
      disabledKeys={disabledKeys}
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        if (keys === 'all') {
          setSelectedKeys(new Set(data?.map((post) => post?.id)));
          return;
        }
        setSelectedKeys(keys as Set<string>);
      }}
      topContentPlacement="outside"
      topContent={
        <>
          {actionMode && (
            <div>
              <button
                onClick={() => {
                  console.log(selectedData);
                }}
              >
                {actionMode}
              </button>
            </div>
          )}
        </>
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
