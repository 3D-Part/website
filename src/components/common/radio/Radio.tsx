"use client";
import React from "react";
import Paragraph from "../text/paragraph/Paragraph";

const Radio: React.FC<{
  title: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({ title, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        name={name}
        value={value}
        className="w-6 h-6"
        checked={checked}
        onChange={onChange}
      />
      <Paragraph size="S" weight="Medium">
        {" "}
        {title}
      </Paragraph>
    </div>
  );
};

export default Radio;
