// src/components/Table.tsx
import React from 'react';

// Definición de tipos
type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

type TableSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

type TableCellProps = React.HTMLProps<HTMLTableCellElement>;
type TableHeaderProps = React.HTMLProps<HTMLTableHeaderCellElement>;
type TableRowProps = React.HTMLProps<HTMLTableRowElement>;

// Componente Table
export const Table: React.FC<TableProps> & {
  THead: React.FC<TableSectionProps>;
  TH: React.FC<TableHeaderProps>;
  TBody: React.FC<TableSectionProps>;
  TR: React.FC<TableRowProps>;
  TD: React.FC<TableCellProps>;
  TFoot: React.FC<TableSectionProps>;
  // eslint-disable-next-line react/prop-types
} = ({ children, ...props }) => {
  return <table {...props}>{children}</table>;
};

// Componente THead
const THead: React.FC<TableSectionProps> = ({ children, ...props }) => {
  return <thead {...props}>{children}</thead>;
};

// Componente TH
const TH: React.FC<TableHeaderProps> = ({ children, ...props }) => {
  return <th {...props}>{children}</th>;
};

// Componente TBody
const TBody: React.FC<TableSectionProps> = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

// Componente TR
const TR: React.FC<TableRowProps> = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};

// Componente TD
const TD: React.FC<TableCellProps> = ({ children, ...props }) => {
  return <td {...props}>{children}</td>;
};

const TFoot: React.FC<TableSectionProps> = ({ children, ...props }) => {
  return <tfoot {...props}>{children}</tfoot>;
};

// Añadir los subcomponentes al componente Table
Table.THead = THead;
Table.TH = TH;
Table.TBody = TBody;
Table.TR = TR;
Table.TD = TD;
Table.TFoot = TFoot;

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { Link } from 'react-router-dom';
// import { Actions } from '../types/actions';
// import { Post } from '../types/post';

// const columnHelper = createColumnHelper<Post & Actions>();

// const columns = [
//   columnHelper.accessor('id', {
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor((row) => row.title, {
//     id: 'title',
//     cell: (info) => <i>{info.getValue()}</i>,
//   }),
//   columnHelper.accessor('views', {
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor('author', {
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor('date', {
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor('edit', {
//     cell: (info) => {
//       const id = info.row.original.id;
//       return <Link to={`/posts/${id}/edit`}>Edit</Link>;
//     },
//   }),
//   columnHelper.accessor('view', {
//     cell: (info) => {
//       const id = info.row.original.id;
//       return <Link to={`/posts/${id}`}>View</Link>;
//     },
//   }),
// ];

// const data = [
//   {
//     id: '1',
//     title: 'Post Title 1',
//     views: 120,
//     author: 'Alice',
//     date: '2024-01-01',
//   },
// ];

// export const Table2 = () => {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext(),
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   // console.log(cell.getContext().getValue());
//                   return (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
