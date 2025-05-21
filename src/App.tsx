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
  const [data, setData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption>({
    homeOwnership: [],
    quarter: [],
    term: [],
    year: [],
  });

  useEffect(() => {
    const initialize = async () => {
      const data = await getData();
      const grades = data.map((item) => item.grade).sort();
      const homeOwnership = data.map((item) => item.homeOwnership).sort();
      const quarter = data.map((item) => item.quarter).sort();
      const term = data.map((item) => item.term).sort();
      const year = data.map((item) => item.year).sort();

      // remove duplicates
      setColumns([...new Set(grades)]);
      setDropdownOptions({
        homeOwnership: [...new Set(homeOwnership)],
        quarter: [...new Set(quarter)],
        term: [...new Set(term)],
        year: [...new Set(year)],
      });
      setData(data);
      setInitializing(false);
    };

    initialize();
  }, []);

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
                {column}
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
          />
          <Multiselect
            placeholder="Quarter"
            options={dropdownOptions.quarter.map((item) => ({
              label: item,
              value: item,
            }))}
          />
          <Multiselect
            placeholder="Term"
            options={dropdownOptions.term.map((item) => ({
              label: item,
              value: item,
            }))}
          />
          <Multiselect
            placeholder="Year"
            options={dropdownOptions.year.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
