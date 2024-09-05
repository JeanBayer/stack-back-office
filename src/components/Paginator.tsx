type PaginatorProps = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  incrementPage: () => void;
  decrementPage: () => void;
  page: number;
  maxPages: number;
};

export const Paginator = ({
  hasPrevPage,
  hasNextPage,
  incrementPage,
  decrementPage,
  page,
  maxPages,
}: PaginatorProps) => {
  return (
    <div>
      <div>
        <p>
          Page {page} / {maxPages}
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            if (hasPrevPage) decrementPage();
          }}
          disabled={!hasPrevPage}
        >
          back
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => {
            if (hasNextPage) incrementPage();
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};
