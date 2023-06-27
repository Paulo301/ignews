import { render, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getSession, useSession } from 'next-auth/react';
import { createClient } from "../../../prismicio";
import { useRouter } from "next/router";

const post = { 
  slug: 'my-new-post', 
  title: 'My new post', 
  content: '<p>Post excerpt</p>', 
  updatedAt: '10 de abril',
};

jest.mock('next-auth/react');
jest.mock("../../../prismicio");
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "unauthenticated" });

    render(
      <Post post={post} />
    );
  
    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({ 
      data: { activeSubscription: 'fake-active-subscription' } as any,
      status: "authenticated" 
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(
      <Post post={post} />
    );

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('loads initial data', async () => {
    const createClientMocked = jest.mocked(createClient);

    createClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post', spans: [] },
          ],
          content: [
            { type: 'paragraph', text: 'Post content', spans: [] },
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    );
  });
});