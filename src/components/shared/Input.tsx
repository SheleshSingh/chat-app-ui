import { type FC } from "react";

interface InputInterface {
  name: string;
  type?: string;
  placeholder: string;
  key?: string | number
}

const Input: FC<InputInterface> = ({
  type,
  name,
  placeholder,
  key = 0
}: InputInterface) => {
  return (
    <input
      key={key}
      type={type}
      name={name}
      placeholder={placeholder}
      className="border-2 border-gray-300 py-2 px-5 w-full outline-0 rounded"
    />
  );
};

export default Input;
