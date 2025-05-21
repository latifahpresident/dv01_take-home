import { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../utils/classname';
import useOnClickOutside from '../../hooks/use-outside-click';

interface MultiselectProps {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  onSelectChange?: (selected: string[]) => void;
  rootClassName?: string;
  listClassName?: string;
  textboxClassName?: string;
  clearKey?: number;
}

export const Multiselect = ({
  options,
  onSelectChange,
  placeholder,
  listClassName,
  rootClassName,
  textboxClassName,
  clearKey,
}: MultiselectProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(ref, handleClickOutside);

  const handleSelect = (data: { checked: boolean; label: string }, value: string) => {
    const newSelected = data.checked
      ? [...selected, value]
      : selected.filter((option) => option !== value);

    setSelected(newSelected);
    onSelectChange?.(newSelected);
  };

  useEffect(() => {
    setSelected([]);
  }, [clearKey]);

  return (
    <div
      className={cn('flex flex-col min-w-56 justify-center items-center relative', rootClassName)}
    >
      <div
        className={cn(
          'flex justify-between text-gray-500 items-center border border-gray-300 w-full rounded-md p-2 cursor-pointer',
          textboxClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          <div>{`${selected.length} Applied `}</div>
        ) : (
          <div>{placeholder || 'Filter by option(s)'}</div>
        )}
        <ChevronDownIcon />
      </div>

      {isOpen && (
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-2 mt-2 w-full border border-gray-300 rounded-md p-2 absolute top-10',
            listClassName
          )}
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              checked={selected.includes(option.value)}
              label={option.label}
              onCheckedChange={(data) => handleSelect(data, option.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
