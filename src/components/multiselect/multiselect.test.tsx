import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Multiselect } from './multiselect';

describe('Multiselect Component', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  beforeEach(() => {
    render(<Multiselect options={options} placeholder="dropdown textbox" />);
  });

  test('renders placeholder when no option selected', () => {
    const textbox = screen.getByText('dropdown textbox');

    expect(textbox).toBeInTheDocument();
  });

  test('opens options list on click', () => {
    const textbox = screen.getByText('dropdown textbox');
    fireEvent.click(textbox);

    expect(screen.getByText('option 1')).toBeVisible();
    expect(screen.getByText('option 2')).toBeVisible();
    expect(screen.getByText('option 3')).toBeVisible();
  });

  test('selects and deselects options and displays count', async () => {
    const textbox = screen.getByText('dropdown textbox');
    await userEvent.click(textbox);
    // Select Option 1
    const opt1Checkbox = screen.getByText('option 1');
    fireEvent.click(opt1Checkbox);

    expect(screen.getByText('1 Applied')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-icon')).toBeInTheDocument();

    const opt2Checkbox = screen.getByText('option 2');
    fireEvent.click(opt2Checkbox);

    expect(screen.getByText('2 Applied')).toBeInTheDocument();
  });
});
