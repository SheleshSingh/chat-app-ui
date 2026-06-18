import type { FC, ReactElement, ReactNode } from "react";

interface CradInterface {
  children?: ReactElement;
  title?: ReactNode;
  footer?: ReactElement;
  divider?: boolean;
  key?: string | number;
  noPadding?: boolean
}
const Card: FC<CradInterface> = ({
  children,
  title,
  footer,
  divider = false,
  key = 0,
  noPadding = false
}) => {
  return (
    <div key={key} className={`${noPadding ? '' : 'px-5 py-4'} border-gray-100 shadow-lg rounded space-y-2`}>
      {title && <h1 className="text-lg font-medium capitalize">{title}</h1>}

      {divider && <div className="border-b border-gray-200 my-4 -mx-5" />}

      {children && <div className="text-gray-500">{children}</div>}

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
};

export default Card;
