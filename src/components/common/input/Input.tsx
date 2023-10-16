import React from "react";

const Input: React.FC<{
  placeholder: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
}> = ({ placeholder, id, type = "text" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-10 px-4 py-2 rounded-lg bg-neutral-700"
      id={id}
    />
  );
};

export default Input;
