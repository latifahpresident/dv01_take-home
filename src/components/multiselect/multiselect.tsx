import { useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface MultiselectProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  onSelect?: () => string[];
}

export const Multiselect = ({ options, onSelect, placeholder }: MultiselectProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelected([...selected, option]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex justify-between text-gray-700 items-center border border-gray-300 rounded-md p-2 w-[300px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          <div>{`${selected.length} Applied `}</div>
        ) : (
          <div>{placeholder || 'All'}</div>
        )}
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 w-[300px] border border-gray-300 rounded-md p-2">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              checked={selected.includes(option.value)}
              label={option.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};
