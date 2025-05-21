import { cn } from '../../utils/classname';

interface MiniLoaderProps {
  className?: string;
  animationClass?: string;
  text?: string;
}

export function MiniLoader({ className, text, animationClass = 'animate-spin' }: MiniLoaderProps) {
  return (
    <div className={cn('flex items-center')}>
      <svg
        className={cn('h-20 w-20 text-gray-800 dark:text-white', className, animationClass)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#8560fc"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      {text && (
        <span className="ml-2 animate-pulse font-poppins text-lg font-semibold text-gray-800">
          {text}
        </span>
      )}
    </div>
  );
}
