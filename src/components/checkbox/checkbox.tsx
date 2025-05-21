import { CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  onCheckedChange?: (data: { checked: boolean; label: string }) => void;
}

export const Checkbox = ({ checked, onCheckedChange = () => {}, label }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newChecked = !isChecked;

    setIsChecked(newChecked);
    onCheckedChange({ checked: newChecked, label: label || '' });
  };

  return (
    <div data-testid="checkbox" className="flex items-center gap-2" onClick={handleClick}>
      <div className="h-6 w-6 flex items-center justify-center border border-gray-300 rounded-md p-0.5">
        {isChecked && <CheckIcon data-testid="checkbox-icon" />}
      </div>
      {label && (
        <span className="text-base capitalize text-gray-700 font-medium">
          {label.toLowerCase()}
        </span>
      )}
    </div>
  );
};
