import { render, screen } from '@testing-library/react';
import AvailableMeals from './AvailableMeals';

describe('AvailableMeals component', () => {
  test('should render the list of meals if request succeeds', async () => {
    render(<AvailableMeals />);
    const listItemElement = await screen.findAllByRole('listitem');
    expect(listItemElement).not.toHaveLength(0);
  });
});
