type LabelProps = {
  label: string;
  htmlFor: string;
  value?: string;
  children?: React.ReactNode;
  isExpand?: boolean;
};

export const Label = ({
  label,
  htmlFor,
  value = '',
  children = null,
  isExpand = false,
}: LabelProps) => {
  const styleToExpand = isExpand
    ? 'text-xs text-foreground-700 py-2'
    : 'text-md text-foreground-500 py-4';

  return (
    <div
      className={`relative w-full flex tap-highlight-transparent shadow-sm px-3 bg-default-100 hover:bg-default-200 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none h-14 py-2 is-filled hover:cursor-pointer`}
    >
      <label
        className={`flex h-full w-full absolute z-10 cursor-pointer  origin-top-left rtl:origin-top-right subpixel-antialiased will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] pe-2 max-w-full text-ellipsis overflow-hidden  ${styleToExpand}`}
        htmlFor={htmlFor}
      >
        {label}

        {isExpand && (
          <span className="absolute z-10 block text-grey-950 pe-2 max-w-full text-ellipsis overflow-hidden top-6 line-clamp-1 text-medium">
            {value}
          </span>
        )}

        {children}
      </label>
    </div>
  );
};
