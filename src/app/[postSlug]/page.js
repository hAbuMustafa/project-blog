import React from 'react';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import { COMPONENTS_MAP } from '@/helpers/components-map';

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

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={COMPONENTS_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
