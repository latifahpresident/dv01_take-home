import { useEffect, useState } from 'react';
import './assets/stylesheets/app.css';
import { Button, Multiselect, Menu, MiniLoader } from './components';
import { getData } from './services/request/api';
import { buildAggregatedData } from './utils/aggregator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DropdownOptions {
  homeOwnership: string[];
  quarter: string[];
  term: string[];
  year: string[];
}

interface OriginalData {
  grade: string;
  homeOwnership: string;
  quarter: string;
  term: string;
  year: string;
  currentBalance: string;
}
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [columns, setColumns] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<OriginalData[]>([]);
  const [aggregatedData, setAggregatedData] = useState<Map<string, any>>(new Map());
  const [chartData, setChartData] = useState<any[]>([]);
  const [clearKey, setClearKey] = useState<number>(0);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({
    homeOwnership: [],
    quarter: [],
    term: [],
    year: [],
  });

  const handleFilterChange = (data: string[], dropdown: string) => {
    let unfilteredData = [...originalData].filter((item: any) => {
      if (data.length > 0) {
        return data.includes(item[dropdown]);
      }
      return true;
    });

    const groupedData = new Map<string, any>();
    unfilteredData.forEach((item) => {
      if (!item.grade) return;

      if (groupedData.has(item.grade)) {
        groupedData.get(item.grade).push(item);
      } else {
        groupedData.set(item.grade, [item]);
      }
    });

    const { chartData, aggregatedData } = buildAggregatedData(groupedData);
    setChartData(chartData);
    setAggregatedData(aggregatedData);
  };

  const handleReset = () => {
    handleFilterChange([], '');
    setClearKey((prev) => prev + 1);
  };

  useEffect(() => {
    const initialize = async () => {
      const data = await getData();

      // minor refactor to make the code more readable
      // this saves me from looping multiple times to get the unique values
      const dataFields = {
        grade: new Set<string>(),
        homeOwnership: new Set<string>(),
        quarter: new Set<string>(),
        term: new Set<string>(),
        year: new Set<string>(),
        groupedData: new Map<string, any>(), //using a map makes it easier to group the data by grade
      };

      data.forEach((item) => {
        // last row is always empty in the csv file
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

      setOriginalData(data);

      const { chartData, aggregatedData } = buildAggregatedData(dataFields.groupedData);

      setChartData(chartData);
      setAggregatedData(aggregatedData);

      setInitializing(false);
    };

    initialize();
  }, []);

  // this is a simple loader to display while the data is loading
  // I would add a skeleton loader if the data was to take longer to load
  if (initializing) {
    return (
      <div className="flex items-center justify-center mb-40">
        <MiniLoader className="mr-2 h-5 w-5 text-xl animate-spin" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Menu />
      <div className="mx-auto">
        <div className="text-2xl font-semibold my-4">Live Data Chart</div>

        {chartData.length > 0 && (
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} title="Live Data Chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                {/* I formatted the y axis like this because it was being cut off otherwise */}
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} width={80} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, 'Value']}
                />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="text-2xl font-semibold mt-4">Live Data Table</div>
        <div className="flex items-center justify-evenly gap-6 mt-6">
          {columns.map((column) => (
            <div key={column} className="flex flex-col items-center justify-center h-44 w-44">
              <div className="flex font-bold items-center w-full h-full justify-center border-2 border-b-0 border-gray-300 pb-2">
                {`Grade ${column}`}
              </div>
              <div className="flex items-center w-full h-full justify-center border-2 border-gray-300">
                {Number(aggregatedData.get(column)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-evenly gap-4 mt-10">
          <Multiselect
            placeholder="Home Ownership"
            clearKey={clearKey}
            options={dropdownOptions.homeOwnership.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'homeOwnership')}
          />
          <Multiselect
            placeholder="Quarter"
            clearKey={clearKey}
            options={dropdownOptions.quarter.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'quarter')}
          />
          <Multiselect
            placeholder="Term"
            clearKey={clearKey}
            options={dropdownOptions.term.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'term')}
          />
          <Multiselect
            placeholder="Year"
            clearKey={clearKey}
            options={dropdownOptions.year.map((item) => ({
              label: item,
              value: item,
            }))}
            onSelectChange={(selected) => handleFilterChange(selected, 'year')}
          />

          <Button label="Reset" onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default App;
