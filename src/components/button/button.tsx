import { cn } from '../../utils/classname';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
