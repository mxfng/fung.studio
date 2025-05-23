import { cn } from "@/lib/utils";

interface PaddingXProps {
  children: React.ReactNode;
  className?: string;
}

const PaddingX = ({ children, className }: PaddingXProps) => {
  return <div className={cn("mx-auto px-[4vw]", className)}>{children}</div>;
};

export default PaddingX;
