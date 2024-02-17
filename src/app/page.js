import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about JavaScript',
};

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      <PostList />
    </div>
  );
}

async function PostList() {
  const list = await getBlogPostList();
  return list.map((post) => <BlogSummaryCard key={post.slug} {...post} />);
}

export default Home;
