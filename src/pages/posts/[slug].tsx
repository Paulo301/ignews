import { asHTML, asText } from "@prismicio/helpers";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { createClient } from "../../../prismicio";

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string; 
    title: string; 
    content: string; 
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  const titleText = `${post.title} | Ignews`

  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  const prismic = createClient();

  if(!session.activeSubscription) {
    console.log("Alo")
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    }
  };
}