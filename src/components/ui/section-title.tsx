import React from "react";

interface SectionTitleProps {
  label: string;
  children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  label,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-['doto'] text-xs">{label}</p>
      <div className="max-w-[85ch]">{children}</div>
    </div>
  );
};
