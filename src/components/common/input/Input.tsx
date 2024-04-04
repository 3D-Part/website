import React from "react";

const Input: React.FC<{
  placeholder: string;
  id: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  className?: string;
  disabled?: boolean;
}> = ({
  placeholder,
  id,
  type = "text",
  required = false,
  value = "",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {" "}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-10 px-4 py-2 rounded-lg disabled:cursor-not-allowed bg-neutral-700 disabled:text-neutral-400"
        id={id}
        required
        defaultValue={value}
        disabled={disabled}
      />
      {required && (
        <span className="absolute h-5 text-xl -translate-x-1/2 -translate-y-1/2 right-2 top-1/2 text-error-500 animate-pulse ">
          *
        </span>
      )}
    </div>
  );
};

export default Input;
