import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/request/api';

jest.mock('./services/request/api');

const mockData = [
  {
    grade: '2',
    homeOwnership: 'MORTGAGE',
    quarter: '4',
    term: '36 months',
    year: '2015',
    currentBalance: '10.00',
  },
  {
    grade: '2',
    homeOwnership: 'RENT',
    quarter: '4',
    term: '36 months',
    year: '2015',
    currentBalance: '30.00',
  },
  {
    grade: '3',
    homeOwnership: 'RENT',
    quarter: '3',
    term: '36 months',
    year: '2014',
    currentBalance: '20.00',
  },
  {
    grade: '3',
    homeOwnership: 'MORTGAGE',
    quarter: '4',
    term: '36 months',
    year: '2014',
    currentBalance: '5.00',
  },
];

describe('<App />', () => {
  beforeEach(() => {
    // @ts-ignore
    api.getData.mockResolvedValue(mockData);
  });

  it('shows the correct balances for each grade', async () => {
    // had to wrap in act to prevent async issues
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText('Grade 2')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();
    expect(screen.getByText('Grade 3')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });

  it('shows loader then renders table with aggregated balances', async () => {
    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      await waitFor(() => expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument());

      const dropdown = screen.getByText('Home Ownership');
      fireEvent.click(dropdown);
    });

    await act(async () => {
      const option = screen.getByText('mortgage');
      fireEvent.click(option);
    });

    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$5.00')).toBeInTheDocument();

    await act(async () => {
      const option = screen.getByText('rent');
      fireEvent.click(option);
    });

    expect(screen.getByText('$40.00')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });
});
