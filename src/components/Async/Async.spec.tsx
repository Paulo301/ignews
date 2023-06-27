import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
  render(<Async />);

  expect(screen.getByText('Async')).toBeInTheDocument();
  expect(await screen.findByText('Async')).toBeInTheDocument();
  // await waitFor(() =>  expect(screen.getByText('Button')).toBeInTheDocument());
  // await waitForElementToBeRemoved(screen.queryByText('Button'));
});