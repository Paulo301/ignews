import { asHTML, asText } from "@prismicio/helpers";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createClient } from "../../../../prismicio";

import styles from '../post.module.scss';

interface PostPriviewProps {
  post: {
    slug: string; 
    title: string; 
    content: string; 
    updatedAt: string;
  }
}

export default function PostPriview({ post }: PostPriviewProps) {
  const titleText = `${post.title} | Ignews`;

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session.data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);
  
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
            className={`${styles.postContent} ${styles.previewContent}`}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href='/'>
              Subscribe now 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content.splice(0,3)),
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