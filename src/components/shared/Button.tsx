import type { FC, ReactNode } from "react";

interface ButtonInterface {
  children: ReactNode;
  type?:
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "danger"
  | "dark"
  | "warning";
  onClick?: () => void;
  icon?: string;
  key?: string | number;
  loading?: boolean
}

const buttonVariants = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  dark: "bg-black text-white",
  info: "bg-cyan-500 text-white hover:bg-cyan-600",
};

const Button: FC<ButtonInterface> = ({
  children = null,
  type = "primary",
  icon,
  onClick,
  key = 0,
  loading = false
}) => {

  if (loading) {
    return(
      <button disabled className="flex gap-1 text-gray-400">
        <i className="ri-loader-4-line animate-spin block"></i>
        Processing...
        </button>
    )
  }
  return (
    <button
      key={key}
      onClick={onClick}
      className={`py-2 px-6 rounded ${buttonVariants[type]}`}
    >
      {icon && <i className={`ri-${icon} mr-2`}></i>}
      {children}
    </button>
  );
};

export default Button;
