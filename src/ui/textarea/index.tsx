import type React from "react";
import "./styles.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => {
  return <textarea className={`textarea ${className}`} {...props} />;
};

export { Textarea };
