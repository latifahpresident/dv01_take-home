import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox Component', () => {
  it('toggles check icon on click and updates internal state', async () => {
    render(<Checkbox checked={false} label="Test" />);

    // Initially unchecked: icon should not be in the document
    expect(screen.queryByTestId('checkbox-icon')).toBeNull();

    // Click to check
    await userEvent.click(screen.getByTestId('checkbox'));
    expect(screen.getByTestId('checkbox-icon')).toBeInTheDocument();

    // Click to uncheck
    await userEvent.click(screen.getByTestId('checkbox'));
    expect(screen.queryByTestId('checkbox-icon')).toBeNull();
  });

  it('calls onCheckedChange with correct data including label', async () => {
    const mockChange = jest.fn();
    render(<Checkbox checked={true} label="Sample" onCheckedChange={mockChange} />);

    // Click to uncheck
    await userEvent.click(screen.getByTestId('checkbox'));
    expect(mockChange).toHaveBeenCalledWith({ checked: false, label: 'Sample' });

    // Click to check
    await userEvent.click(screen.getByTestId('checkbox'));
    expect(mockChange).toHaveBeenCalledWith({ checked: true, label: 'Sample' });
  });
});
