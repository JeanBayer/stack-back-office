import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { FieldSkeleton, Paginator } from '@tabla-simple/components';

const ITEMS = Array.from({ length: 10 }).map((_, i) => i);

export const TableSkeleton = () => {
  return (
    <Table
      aria-label="Skeleton table"
      className="text-slate-900"
      selectionMode="single"
      bottomContent={<Paginator changePage={() => {}} page={1} maxPages={1} />}
    >
      <TableHeader>
        <TableColumn>
          <FieldSkeleton.Line />
        </TableColumn>
        <TableColumn>
          <FieldSkeleton.Line />
        </TableColumn>
        <TableColumn>
          <FieldSkeleton.Line />
        </TableColumn>
        <TableColumn>
          <FieldSkeleton.Line />
        </TableColumn>
        <TableColumn>
          <FieldSkeleton.Line />
        </TableColumn>
      </TableHeader>

      <TableBody>
        {ITEMS.map((row) => (
          <TableRow key={row}>
            <TableCell>
              <FieldSkeleton.Line />
            </TableCell>

            <TableCell>
              <FieldSkeleton.Line />
            </TableCell>

            <TableCell>
              <FieldSkeleton.Line />
            </TableCell>

            <TableCell>
              <FieldSkeleton.Line />
            </TableCell>

            <TableCell width={30}>
              <FieldSkeleton.Line />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
