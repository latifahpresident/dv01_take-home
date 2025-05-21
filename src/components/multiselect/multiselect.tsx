import { useState } from 'react';

interface MultiselectProps {
  options: {
    label: string;
    value: string;
  }[];
  onSelect?: () => string[];
}

export const Multiselect = ({ options, onSelect }: MultiselectProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setSelected([...selected, option]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div>All</div>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value} onClick={() => handleSelect(option.value)}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
