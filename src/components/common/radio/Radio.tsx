"use client";
import React from "react";
import Paragraph from "../text/paragraph/Paragraph";

const Radio: React.FC<{
  title: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void | undefined;
}> = ({ title, name, value, checked, onChange }) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        onChange();
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="w-6 h-6 cursor-pointer"
        checked={checked}
        // onChange={onChange}
      />
      <Paragraph size="S" weight="Medium">
        {" "}
        {title}
      </Paragraph>
    </div>
  );
};

export default Radio;
