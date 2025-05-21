import { useEffect, useState } from 'react';
import './assets/stylesheets/app.css';
import { Button, Multiselect } from './components';
import { getData } from './services/request/api';
import { Menu } from './domain/home/menu';
import { MiniLoader } from './components/mini-loader/mini-loader';

interface DropdownOption {
  homeOwnership: string[];
  quarter: string[];
  term: string[];
  year: string[];
}

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [columns, setColumns] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [groupedData, setGroupedData] = useState<Map<string, any>>(new Map());
  const [filterOptions, setFilterOptions] = useState<DropdownOption>({
    homeOwnership: [],
    quarter: [],
    term: [],
    year: [],
  });

  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption>({
    homeOwnership: [],
    quarter: [],
    term: [],
    year: [],
  });

  useEffect(() => {
    const initialize = async () => {
      const data = await getData();

      const dataFields = {
        grade: new Set<string>(),
        homeOwnership: new Set<string>(),
        quarter: new Set<string>(),
        term: new Set<string>(),
        year: new Set<string>(),
        groupedData: new Map<string, any>(),
      };

      data.forEach((item) => {
        if (!item.grade) return;

        dataFields.grade.add(item.grade);
        dataFields.homeOwnership.add(item.homeOwnership);
        dataFields.quarter.add(item.quarter);
        dataFields.term.add(item.term);
        dataFields.year.add(item.year);

        if (dataFields.groupedData.has(item.grade)) {
          dataFields.groupedData.get(item.grade).push(item);
        } else {
          dataFields.groupedData.set(item.grade, [item]);
        }
      });

      // remove empty strings & sort
      setColumns([...dataFields.grade].sort());
      setDropdownOptions({
        homeOwnership: [...dataFields.homeOwnership].sort(),
        quarter: [...dataFields.quarter].sort(),
        term: [...dataFields.term].sort(),
        year: [...dataFields.year].sort(),
      });

      setGroupedData(dataFields.groupedData);
      setOriginalData(data);
      setInitializing(false);
    };

    initialize();
  }, []);

  const handleFilterChange = (data: string[], dropdown: string) => {
    setFilterOptions(data);
  };

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MiniLoader className="mr-2 h-5 w-5 text-xl animate-spin" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="App flex flex-col items-center">
      <Menu />

      <div className="mx-auto mt-20">
        <div className="flex items-center justify-evenly gap-6 mb-10">
          {columns.map((column) => (
            <div className="flex flex-col items-center justify-center h-40 w-40">
              <div className="flex items-center w-full h-full justify-center border-2 border-b-0 border-gray-300 pb-2">
                {`Grade ${column}`}
              </div>
              <div className="flex items-center w-full h-full justify-center border-2 border-gray-300">
                {column}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-evenly gap-4">
          <Multiselect
            placeholder="Home Ownership"
            options={dropdownOptions.homeOwnership.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'homeOwnership')}
          />
          <Multiselect
            placeholder="Quarter"
            options={dropdownOptions.quarter.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'quarter')}
          />
          <Multiselect
            placeholder="Term"
            options={dropdownOptions.term.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'term')}
          />
          <Multiselect
            placeholder="Year"
            options={dropdownOptions.year.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'year')}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
