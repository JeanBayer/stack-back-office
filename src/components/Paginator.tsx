import { Pagination } from '@nextui-org/react';

type PaginatorProps = {
  changePage: (page: number) => void;
  page: number;
  maxPages: number;
};

export const Paginator = ({ changePage, page, maxPages }: PaginatorProps) => {
  return (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={maxPages}
        onChange={changePage}
      />
    </div>
  );
};
