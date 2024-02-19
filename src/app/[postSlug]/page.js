import React from 'react';
import { notFound } from 'next/navigation';

import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import { COMPONENTS_MAP } from '@/helpers/components-map';
import { BLOG_TITLE } from '@/constants';
import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.frontmatter.title} • ${BLOG_TITLE}`,
    description: post.frontmatter.abstract,
  };
}

async function Blog({ slug }) {
  const post = await loadBlogPost(slug);

  return (
    <>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={COMPONENTS_MAP} />
      </div>
    </>
  );
}

function BlogPost({ params }) {
  return (
    <article className={styles.wrapper}>
      <Blog slug={params.postSlug} />
    </article>
  );
}

export default BlogPost;
