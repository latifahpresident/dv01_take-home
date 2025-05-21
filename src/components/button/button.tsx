import { cn } from '../../utils/classname';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button className={cn('bg-blue-500 text-white p-2 rounded-md', className)} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
