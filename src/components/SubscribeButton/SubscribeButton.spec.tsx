import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { SubscribeButton } from '.';
import { useRouter } from 'next/router';

jest.mock('next-auth/react');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

    render(<SubscribeButton />);
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sigin when not authenticated', () => {
    const sigInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now')
  
    fireEvent.click(subscribeButton);

    expect(sigInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has an subscription', () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@email.com',
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      }, 
      status: "authenticated" 
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now')
  
    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});