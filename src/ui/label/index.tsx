import type React from "react";
import "./styles.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <label className={`label ${className}`} {...props}>
      {children}
    </label>
  );
};

export { Label };
