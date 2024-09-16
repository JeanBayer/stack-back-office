import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Paginator } from './paginator';

const ITEMS = Array.from({ length: 10 }).map((_, i) => i);

export const TableSkeleton = () => {
  return (
    <Table
      aria-label="Example static collection table"
      className="text-slate-900"
      selectionMode="single"
      bottomContent={<Paginator changePage={() => {}} page={1} maxPages={1} />}
    >
      <TableHeader>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </TableColumn>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </TableColumn>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </TableColumn>
        <TableColumn>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </TableColumn>
      </TableHeader>

      <TableBody>
        {ITEMS.map((row) => (
          <TableRow key={row}>
            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </TableCell>

            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </TableCell>

            <TableCell>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </TableCell>

            <TableCell width={30}>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};