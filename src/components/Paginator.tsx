import { Pagination } from '@nextui-org/react';

type PaginatorProps = {
  incrementPage: () => void;
  decrementPage: () => void;
  page: number;
  maxPages: number;
};

export const Paginator = ({
  incrementPage,
  decrementPage,
  page,
  maxPages,
}: PaginatorProps) => {
  return (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={maxPages}
        onChange={(newPage) => {
          if (newPage > page) {
            incrementPage();
          }
          if (newPage < page) {
            decrementPage();
          }
        }}
      />
    </div>
  );
};
