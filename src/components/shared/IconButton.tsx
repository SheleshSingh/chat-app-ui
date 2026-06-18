import type { FC } from "react";


const IconbuttonVariants = {
    primary:
        "bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white",

    secondary:
        "bg-gray-50 text-gray-500 hover:bg-gray-500 hover:text-white",

    success:
        "bg-green-50 text-green-500 hover:bg-green-500 hover:text-white",

    danger:
        "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white",

    warning:
        "bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-white",

    dark:
        "bg-slate-100 text-slate-800 hover:bg-slate-800 hover:text-white",

    info:
        "bg-cyan-50 text-cyan-500 hover:bg-cyan-500 hover:text-white",
};

interface IconButtonInterface {
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
    key?: string | number
}

const IconButton: FC<IconButtonInterface> = ({
    type = "primary",
    icon,
    onClick,
    key = 0
}) => {
    return (
        <button
            key={key}
            onClick={onClick}
            className={`rounded w-9 h-9 text-base ${IconbuttonVariants[type]}`}
        >
            <i className={`ri-${icon}`}></i>
        </button>
    );
};

export default IconButton;
