import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink 
        href='/' 
        activeClassName='active' 
        text='Link' 
      />
    );
  
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
  
  it('adds active class if the link is currently active', () => {
    render(
      <ActiveLink 
        href='/' 
        activeClassName='active' 
        text='Link' 
      />
    );
  
    expect(screen.getByText('Link')).toHaveClass('active');
  });
});