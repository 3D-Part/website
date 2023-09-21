import React from "react";

const Textarea: React.FC<{
  placeholder: string;
  id: string;
  rows: number;
  maxLength: number;
  cols: number;
}> = ({ placeholder, id, cols, maxLength, rows }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg bg-neutral-700"
      id={id}
      cols={cols}
      rows={rows}
      maxLength={maxLength}
    ></textarea>
  );
};

export default Textarea;
